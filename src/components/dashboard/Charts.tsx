"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const CATEGORY_COLORS: Record<string, string> = {
  "US News":       "#22c55e",
  "World News":    "#6366f1",
  "Technology":    "#3b82f6",
  "Gaming":        "#a855f7",
  "Science":       "#06b6d4",
  "Sports":        "#f59e0b",
  "Business":      "#10b981",
  "Entertainment": "#f43f5e",
};

export interface CategoryCount {
  name: string;
  count: number;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface DateCount {
  date: string;
  count: number;
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function CategoryPieChart({ data }: { data: CategoryCount[] }) {
  const nonZero = data.filter((d) => d.count > 0);
  if (nonZero.length === 0)
    return <ChartCard title="By Category"><p className="text-xs text-muted-foreground text-center py-8">No data yet</p></ChartCard>;

  return (
    <ChartCard title="By Category">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={nonZero}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={3}
          >
            {nonZero.map((entry) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_COLORS[entry.name] ?? "#94a3b8"}
              />
            ))}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2">
        {nonZero.map((d) => (
          <span key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: CATEGORY_COLORS[d.name] ?? "#94a3b8" }}
            />
            {d.name.charAt(0).toUpperCase() + d.name.slice(1)} ({d.count})
          </span>
        ))}
      </div>
    </ChartCard>
  );
}

export function TopTagsBarChart({ data }: { data: TagCount[] }) {
  const top = data.slice(0, 8);
  if (top.length === 0)
    return <ChartCard title="Top Tags"><p className="text-xs text-muted-foreground text-center py-8">No data yet</p></ChartCard>;

  return (
    <ChartCard title="Top Tags">
      <ResponsiveContainer width="100%" height={190}>
        <BarChart data={top} layout="vertical" margin={{ left: 4, right: 16 }}>
          <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="tag"
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={68}
          />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="count" fill="#6366f1" radius={[0, 3, 3, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ActivityLineChart({ data }: { data: DateCount[] }) {
  if (data.length === 0)
    return <ChartCard title="Activity (14 days)"><p className="text-xs text-muted-foreground text-center py-8">No data yet</p></ChartCard>;

  // Short date labels
  const formatted = data.map((d) => ({
    ...d,
    label: d.date.slice(5), // "MM-DD"
  }));

  return (
    <ChartCard title="Activity (14 days)">
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={formatted} margin={{ left: 0, right: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="label" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
