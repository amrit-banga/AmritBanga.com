import { createClient } from "@libsql/client";

function getClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) throw new Error("TURSO_DATABASE_URL is not set");
  return createClient({ url, authToken });
}

export async function initDb() {
  const db = getClient();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS news_items (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      title         TEXT NOT NULL,
      url           TEXT UNIQUE NOT NULL,
      description   TEXT,
      pub_date      TEXT,
      source        TEXT NOT NULL,
      category      TEXT NOT NULL,
      summary       TEXT,
      quality_score INTEGER,
      tags          TEXT DEFAULT '[]',
      fetched_at    TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
    )
  `);
  return db;
}

export async function getDb() {
  return getClient();
}

export interface NewsItem {
  id: number;
  title: string;
  url: string;
  description: string | null;
  pub_date: string | null;
  source: string;
  category: string;
  summary: string | null;
  quality_score: number | null;
  tags: string[];
  fetched_at: string;
}

export const TOPIC_OPTIONS = [
  { value: "us",            label: "US News",       emoji: "🇺🇸", description: "Top stories from American news sources" },
  { value: "world",         label: "World News",    emoji: "🌍", description: "International headlines and global events" },
  { value: "technology",    label: "Technology",    emoji: "💻", description: "Tech industry, startups, and innovation" },
  { value: "gaming",        label: "Gaming",        emoji: "🎮", description: "Game releases, reviews, and industry news" },
  { value: "science",       label: "Science",       emoji: "🔬", description: "Scientific discoveries and research" },
  { value: "sports",        label: "Sports",        emoji: "🏈", description: "Scores, trades, and sports coverage" },
  { value: "business",      label: "Business",      emoji: "💼", description: "Markets, economy, and finance" },
  { value: "entertainment", label: "Entertainment", emoji: "🎬", description: "Movies, music, TV, and pop culture" },
] as const;

export type TopicValue = typeof TOPIC_OPTIONS[number]["value"];
