import type { Metadata } from "next";
import { initDb, type NewsItem } from "@/lib/db";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Personal AI News Intelligence Dashboard",
};

export default async function DashboardPage() {
  const db = await initDb();

  const result = await db.execute(
    "SELECT * FROM news_items ORDER BY fetched_at DESC LIMIT 500"
  );

  const items: NewsItem[] = result.rows.map((item) => ({
    id: item.id as number,
    title: item.title as string,
    url: item.url as string,
    description: item.description as string | null,
    pub_date: item.pub_date as string | null,
    source: item.source as string,
    category: item.category as "world" | "us" | "gaming",
    summary: item.summary as string | null,
    quality_score: item.quality_score as number | null,
    tags: JSON.parse((item.tags as string) ?? "[]") as string[],
    fetched_at: item.fetched_at as string,
  }));

  return <DashboardClient initialItems={items} />;
}
