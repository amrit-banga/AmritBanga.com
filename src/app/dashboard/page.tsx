import type { Metadata } from "next";
import { getDb, type NewsItem } from "@/lib/db";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Personal AI News Intelligence Dashboard",
};

export default function DashboardPage() {
  const db = getDb();

  const raw = db
    .prepare("SELECT * FROM news_items ORDER BY fetched_at DESC LIMIT 500")
    .all() as (Omit<NewsItem, "tags"> & { tags: string })[];

  const items: NewsItem[] = raw.map((item) => ({
    ...item,
    tags: JSON.parse(item.tags ?? "[]") as string[],
  }));

  return <DashboardClient initialItems={items} />;
}
