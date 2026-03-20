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
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      title        TEXT NOT NULL,
      url          TEXT UNIQUE NOT NULL,
      description  TEXT,
      pub_date     TEXT,
      source       TEXT NOT NULL,
      category     TEXT NOT NULL,
      summary      TEXT,
      quality_score INTEGER,
      tags         TEXT DEFAULT '[]',
      fetched_at   TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
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
  category: "world" | "us" | "gaming";
  summary: string | null;
  quality_score: number | null;
  tags: string[];
  fetched_at: string;
}
