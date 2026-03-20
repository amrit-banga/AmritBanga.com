import { NextResponse } from "next/server";
import Parser from "rss-parser";
import Anthropic from "@anthropic-ai/sdk";
import { getDb } from "@/lib/db";

const parser = new Parser({
  headers: { "User-Agent": "Mozilla/5.0 (compatible; NewsDashboard/1.0)" },
  timeout: 15000,
});

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const FEEDS: Record<string, string[]> = {
  world: [
    "https://feeds.reuters.com/reuters/worldNews",
    "http://feeds.bbci.co.uk/news/world/rss.xml",
    "https://www.theguardian.com/world/rss",
    "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    "https://www.foxnews.com/world",
  ],
  us: [
    "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    "https://feeds.washingtonpost.com/rss/national",
    "http://rss.cnn.com/rss/cnn_us.rss",
    "https://www.foxnews.com/us",
  ],
  gaming: [
    "http://feeds.feedburner.com/ign/games-all",
    "https://www.gamesindustry.biz/feed/news",
    "https://www.eurogamer.net/feed/news",
    "https://kotaku.com/rss",
  ],
};

// Max new items to run through Claude per refresh, per category
const MAX_NEW_PER_CATEGORY = 15;
const BATCH_SIZE = 3;

async function analyzeArticle(title: string, description: string) {
  if (!anthropic) throw new Error("No Anthropic client");

  const response = await anthropic.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `Analyze this news article. Return ONLY a JSON object — no markdown, no extra text.

Title: ${title}
Content: ${description.slice(0, 800)}

{
  "summary": "1-2 sentence plain-English summary, max 200 chars",
  "quality_score": <integer 1-10>,
  "tags": ["tag1", "tag2", "tag3"]
}

quality_score guide: 10=breaking/major world event, 7-9=significant news, 4-6=notable but routine, 1-3=minor/fluff.
Tags: 2-4 topics from: politics, economy, technology, sports, science, health, climate, war, entertainment, business, gaming, esports, diplomacy, crime, finance`,
      },
    ],
  });

  const block = response.content[0];
  const raw = block?.type === "text" ? block.text.trim() : "{}";
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON in response");
  return JSON.parse(match[0]) as {
    summary: string;
    quality_score: number;
    tags: string[];
  };
}

export async function POST() {
  const db = getDb();
  const errors: string[] = [];
  let totalFetched = 0;
  let totalNew = 0;
  let totalAnalyzed = 0;

  // Fetch all RSS feeds concurrently
  const candidates: { item: Parser.Item; category: string; source: string }[] = [];

  await Promise.allSettled(
    Object.entries(FEEDS).flatMap(([category, urls]) =>
      urls.map(async (url) => {
        try {
          const feed = await parser.parseURL(url);
          const source = feed.title || new URL(url).hostname;
          for (const item of (feed.items ?? []).slice(0, 20)) {
            if (item.link && item.title) {
              candidates.push({ item, category, source });
              totalFetched++;
            }
          }
        } catch (e) {
          errors.push(`${url}: ${(e as Error).message}`);
        }
      })
    )
  );

  // Find items not already in DB
  const existingUrls = new Set<string>(
    (db.prepare("SELECT url FROM news_items").all() as { url: string }[]).map(
      (r) => r.url ?? ""
    )
  );

  // Cap per category so no single category starves the others
  const seenPerCategory: Record<string, number> = {};
  const newItems = candidates.filter(({ item, category }) => {
    if (!item.link || existingUrls.has(item.link)) return false;
    seenPerCategory[category] = (seenPerCategory[category] ?? 0) + 1;
    return seenPerCategory[category] <= MAX_NEW_PER_CATEGORY;
  });

  totalNew = newItems.length;

  const insert = db.prepare(`
    INSERT OR IGNORE INTO news_items
      (title, url, description, pub_date, source, category, summary, quality_score, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Process in batches of BATCH_SIZE concurrent Claude calls
  for (let i = 0; i < newItems.length; i += BATCH_SIZE) {
    const batch = newItems.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async ({ item, category, source }) => {
        let summary: string | null = null;
        let quality_score: number | null = null;
        let tags = "[]";

        if (anthropic) {
          try {
            const analysis = await analyzeArticle(
              item.title!,
              item.contentSnippet ?? item.content ?? item.summary ?? ""
            );
            summary = analysis.summary ?? null;
            quality_score = analysis.quality_score ?? null;
            tags = JSON.stringify(analysis.tags ?? []);
            totalAnalyzed++;
          } catch {
            // AI analysis failed — insert without it
          }
        }

        insert.run(
          item.title,
          item.link,
          item.contentSnippet ?? item.summary ?? null,
          item.pubDate ?? item.isoDate ?? null,
          source,
          category,
          summary,
          quality_score,
          tags
        );
      })
    );
  }

  return NextResponse.json({ fetched: totalFetched, new: totalNew, analyzed: totalAnalyzed, errors });
}
