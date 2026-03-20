"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsCard } from "./NewsCard";
import { TopicPicker } from "./TopicPicker";
import { CategoryPieChart, TopTagsBarChart, ActivityLineChart } from "./Charts";
import { TOPIC_OPTIONS, type TopicValue, type NewsItem } from "@/lib/db";
import type { CategoryCount, TagCount, DateCount } from "./Charts";

const LS_TOPICS = "dashboard_topics";
const LS_LAST_REFRESH = "dashboard_last_refresh";
const COOLDOWN_MS = 2 * 60 * 60 * 1000; // 2 hours

interface RefreshStatus {
  fetched: number;
  new: number;
  analyzed: number;
  errors: string[];
}

function computeStats(items: NewsItem[]) {
  const byCategory: CategoryCount[] = TOPIC_OPTIONS.map(({ value, label }) => ({
    name: label,
    count: items.filter((i) => i.category === value).length,
  })).filter((c) => c.count > 0);

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

function getCooldownRemaining(): number {
  const raw = localStorage.getItem(LS_LAST_REFRESH);
  if (!raw) return 0;
  const elapsed = Date.now() - new Date(raw).getTime();
  return Math.max(0, COOLDOWN_MS - elapsed);
}

function formatCooldown(ms: number): string {
  const totalMinutes = Math.ceil(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function DashboardClient({ initialItems }: { initialItems: NewsItem[] }) {
  const [mounted, setMounted] = useState(false);
  const [topics, setTopics] = useState<TopicValue[] | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [allItems, setAllItems] = useState<NewsItem[]>(initialItems);
  const [category, setCategory] = useState("all");
  const [minScore, setMinScore] = useState(1);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState<RefreshStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(LS_TOPICS);
    if (saved) {
      setTopics(JSON.parse(saved) as TopicValue[]);
    } else {
      setTopics([]);
    }
    setCooldownRemaining(getCooldownRemaining());
    setMounted(true);
  }, []);

  // Tick down cooldown every minute
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const id = setInterval(() => {
      const remaining = getCooldownRemaining();
      setCooldownRemaining(remaining);
    }, 60000);
    return () => clearInterval(id);
  }, [cooldownRemaining]);

  function saveTopics(selected: TopicValue[]) {
    localStorage.setItem(LS_TOPICS, JSON.stringify(selected));
    setTopics(selected);
    setShowPicker(false);
    setCategory("all");
  }

  const activeTopics = topics ?? [];

  const filteredByTopic = useMemo(
    () => activeTopics.length > 0
      ? allItems.filter((i) => activeTopics.includes(i.category as TopicValue))
      : [],
    [allItems, activeTopics]
  );

  const stats = useMemo(() => computeStats(filteredByTopic), [filteredByTopic]);

  const categoryOptions = useMemo(() => [
    { value: "all", label: "All" },
    ...TOPIC_OPTIONS.filter(({ value }) => activeTopics.includes(value)),
  ], [activeTopics]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return filteredByTopic.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (item.quality_score !== null && item.quality_score < minScore) return false;
      if (q && !item.title.toLowerCase().includes(q) && !item.summary?.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [filteredByTopic, category, minScore, search]);

  const handleRefresh = useCallback(async () => {
    const remaining = getCooldownRemaining();
    if (remaining > 0) {
      setError(`Refresh available in ${formatCooldown(remaining)}.`);
      return;
    }

    setRefreshing(true);
    setStatus(null);
    setError(null);
    try {
      const fetchRes = await fetch("/api/fetch-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: activeTopics }),
      });
      const fetchData = (await fetchRes.json()) as RefreshStatus & { error?: string };
      if (!fetchRes.ok) throw new Error(fetchData.error ?? `HTTP ${fetchRes.status}`);
      setStatus(fetchData);

      localStorage.setItem(LS_LAST_REFRESH, new Date().toISOString());
      setCooldownRemaining(COOLDOWN_MS);

      const newsRes = await fetch("/api/news");
      if (!newsRes.ok) throw new Error(`HTTP ${newsRes.status}`);
      const newsData = (await newsRes.json()) as { items: (Omit<NewsItem, "tags"> & { tags: string | string[] })[] };
      setAllItems(
        newsData.items.map((i) => ({
          ...i,
          tags: Array.isArray(i.tags) ? i.tags : (JSON.parse(i.tags ?? "[]") as string[]),
        }))
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setRefreshing(false);
    }
  }, [activeTopics]);

  // Not yet mounted — avoid hydration mismatch
  if (!mounted) return null;

  // Show topic picker on first visit or when user requests it
  if (showPicker || topics?.length === 0) {
    return <TopicPicker onSave={saveTopics} />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredByTopic.length} articles · {activeTopics.length} topic{activeTopics.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRefresh}
            disabled={refreshing || cooldownRemaining > 0}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing
              ? "Fetching…"
              : cooldownRemaining > 0
              ? `Available in ${formatCooldown(cooldownRemaining)}`
              : "Refresh Feeds"}
          </Button>
          <Button
            onClick={() => setShowPicker(true)}
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
          >
            <Settings className="h-4 w-4" />
            Topics
          </Button>
        </div>
      </div>

      {/* Status / error */}
      {status && (
        <div className="text-xs text-muted-foreground rounded-lg border border-border px-4 py-2.5">
          Fetched {status.fetched} articles · {status.new} new · {status.analyzed} analyzed by AI
          {status.errors.length > 0 && ` · ${status.errors.length} feed errors`}
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
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
        <div className="flex rounded-lg border border-border overflow-hidden text-sm">
          {categoryOptions.map(({ value, label }) => (
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
          {filteredByTopic.length === 0
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
