import { NextResponse, NextRequest } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "500"), 1000);

  const db = getDb();
  const raw = db
    .prepare("SELECT * FROM news_items ORDER BY fetched_at DESC LIMIT ?")
    .all(limit) as Record<string, unknown>[];

  const items = raw.map((item) => ({
    ...item,
    tags: JSON.parse((item.tags as string) ?? "[]") as string[],
  }));

  return NextResponse.json({ items });
}
