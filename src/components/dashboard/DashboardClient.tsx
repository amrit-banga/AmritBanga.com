"use client";

import { useState, useMemo, useCallback } from "react";
import { RefreshCw, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsCard } from "./NewsCard";
import { CategoryPieChart, TopTagsBarChart, ActivityLineChart } from "./Charts";
import type { NewsItem } from "@/lib/db";
import type { CategoryCount, TagCount, DateCount } from "./Charts";

interface RefreshStatus {
  fetched: number;
  new: number;
  analyzed: number;
  errors: string[];
}

function computeStats(items: NewsItem[]) {
  // By category
  const byCategory: CategoryCount[] = ["world", "us", "gaming"].map((name) => ({
    name,
    count: items.filter((i) => i.category === name).length,
  }));

  // Top tags
  const tagMap: Record<string, number> = {};
  items.forEach((item) => {
    item.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] ?? 0) + 1;
    });
  });
  const topTags: TagCount[] = Object.entries(tagMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }));

  // Activity by date (last 14 days)
  const dateMap: Record<string, number> = {};
  items.forEach((item) => {
    const raw = item.fetched_at ?? "";
    const date = raw.includes("T") ? raw.split("T")[0] : raw.split(" ")[0];
    if (date) dateMap[date] = (dateMap[date] ?? 0) + 1;
  });
  const byDate: DateCount[] = Object.entries(dateMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-14)
    .map(([date, count]) => ({ date, count }));

  return { byCategory, topTags, byDate };
}

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "world", label: "World" },
  { value: "us", label: "US" },
  { value: "gaming", label: "Gaming" },
];

export function DashboardClient({ initialItems }: { initialItems: NewsItem[] }) {
  const [allItems, setAllItems] = useState<NewsItem[]>(initialItems);
  const [category, setCategory] = useState("all");
  const [minScore, setMinScore] = useState(1);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState<RefreshStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stats = useMemo(() => computeStats(allItems), [allItems]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allItems.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (item.quality_score !== null && item.quality_score < minScore) return false;
      if (q && !item.title.toLowerCase().includes(q) && !item.summary?.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [allItems, category, minScore, search]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setStatus(null);
    setError(null);
    try {
      const fetchRes = await fetch("/api/fetch-news", { method: "POST" });
      if (!fetchRes.ok) throw new Error(`HTTP ${fetchRes.status}`);
      const fetchData = (await fetchRes.json()) as RefreshStatus;
      setStatus(fetchData);

      const newsRes = await fetch("/api/news");
      if (!newsRes.ok) throw new Error(`HTTP ${newsRes.status}`);
      const newsData = (await newsRes.json()) as { items: (Omit<NewsItem, "tags"> & { tags: string | string[] })[] };
      setAllItems(
        newsData.items.map((i) => ({
          ...i,
          tags: Array.isArray(i.tags)
            ? i.tags
            : (JSON.parse(i.tags ?? "[]") as string[]),
        }))
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {allItems.length} articles indexed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Fetching…" : "Refresh Feeds"}
          </Button>
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>

      {/* Refresh status / error */}
      {status && (
        <div className="text-xs text-muted-foreground rounded-lg border border-border px-4 py-2.5">
          Fetched {status.fetched} articles · {status.new} new · {status.analyzed} analyzed by AI
          {status.errors.length > 0 && ` · ${status.errors.length} feed errors`}
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          Refresh failed: {error}
        </p>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CategoryPieChart data={stats.byCategory} />
        <TopTagsBarChart data={stats.topTags} />
        <ActivityLineChart data={stats.byDate} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Category tabs */}
        <div className="flex rounded-lg border border-border overflow-hidden text-sm">
          {CATEGORY_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setCategory(value)}
              className={`px-3 py-1.5 transition-colors ${
                category === value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Min score */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground whitespace-nowrap">Min score</span>
          <input
            type="range"
            min={1}
            max={10}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-24 accent-primary"
          />
          <span className="w-4 text-center font-mono">{minScore}</span>
        </div>

        {/* Search */}
        <Input
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs text-sm h-9"
        />

        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} articles
        </span>
      </div>

      {/* News grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">
          {allItems.length === 0
            ? 'No articles yet. Click "Refresh Feeds" to fetch news.'
            : "No articles match your filters."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
