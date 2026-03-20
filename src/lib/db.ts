import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "news.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.exec(`
      CREATE TABLE IF NOT EXISTS news_items (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        title        TEXT NOT NULL,
        url          TEXT UNIQUE NOT NULL,
        description  TEXT,
        pub_date     TEXT,
        source       TEXT NOT NULL,
        category     TEXT NOT NULL CHECK(category IN ('world', 'us', 'gaming')),
        summary      TEXT,
        quality_score INTEGER,
        tags         TEXT DEFAULT '[]',
        fetched_at   TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
      )
    `);
  }
  return _db;
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
