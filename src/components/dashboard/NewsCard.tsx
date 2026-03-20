import type { NewsItem } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

function scoreVariant(score: number | null): {
  label: string;
  className: string;
} {
  if (!score) return { label: "—", className: "bg-muted text-muted-foreground" };
  if (score >= 7) return { label: String(score), className: "bg-green-500 text-white" };
  if (score >= 4) return { label: String(score), className: "bg-amber-500 text-white" };
  return { label: String(score), className: "bg-red-500 text-white" };
}

function categoryLabel(cat: string) {
  return { world: "World", us: "US", gaming: "Gaming" }[cat] ?? cat;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return null;
  }
}

export function NewsCard({ item }: { item: NewsItem }) {
  const score = scoreVariant(item.quality_score);
  const date = formatDate(item.pub_date ?? item.fetched_at);

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border p-5 bg-card hover:bg-accent/30 transition-colors">
      {/* Title row */}
      <div className="flex items-start gap-2">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 font-semibold text-sm leading-snug line-clamp-2 hover:underline"
        >
          {item.title}
        </a>
        <ExternalLink className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground" />
      </div>

      {/* AI summary */}
      {item.summary && (
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {item.summary}
        </p>
      )}

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="tech" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center gap-2 mt-auto pt-1 flex-wrap">
        {/* Score badge */}
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${score.className}`}
        >
          {score.label}
        </span>

        <Badge variant="outline" className="text-[10px]">
          {categoryLabel(item.category)}
        </Badge>

        <span className="text-xs text-muted-foreground truncate max-w-[120px]">
          {item.source}
        </span>

        {date && (
          <span className="text-xs text-muted-foreground ml-auto">{date}</span>
        )}
      </div>
    </article>
  );
}
