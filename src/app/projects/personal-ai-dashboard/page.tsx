import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Personal AI Dashboard",
  description: "A self-hosted dashboard for interacting with and monitoring multiple AI models in one place.",
};

export default function PersonalAIDashboardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Projects
      </Link>

      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Personal AI Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          {["Python", "Next.js", "TypeScript", "REST APIs"].map((t) => (
            <Badge key={t} variant="tech">{t}</Badge>
          ))}
        </div>
      </header>

      <div className="mb-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          <LayoutDashboard className="h-4 w-4" />
          Open Dashboard
        </Link>
      </div>

      <Separator className="mb-10" />

      <section className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          A self-hosted web dashboard for interacting with and monitoring multiple AI models
          from a single interface. Built to reduce context-switching between different AI
          tools and to give a clearer picture of usage patterns over time.
        </p>
        <p>
          The frontend is built with Next.js and TypeScript, and the backend proxies requests
          to various model provider APIs. The dashboard surfaces response latency, token usage,
          and model comparisons across sessions.
        </p>
      </section>
    </div>
  );
}
