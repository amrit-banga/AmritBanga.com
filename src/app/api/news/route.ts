import { NextResponse, NextRequest } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "500"), 1000);

  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM news_items ORDER BY fetched_at DESC LIMIT ?",
    args: [limit],
  });

  const items = result.rows.map((item) => ({
    ...item,
    tags: JSON.parse((item.tags as string) ?? "[]") as string[],
  }));

  return NextResponse.json({ items });
}
