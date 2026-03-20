import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Amrit Banga.",
};

const projects = [
  {
    slug: "personal-ai-dashboard",
    title: "Personal AI Dashboard",
    summary: "A self-hosted dashboard for interacting with and monitoring multiple AI models in one place.",
    tech: ["Python", "Next.js", "TypeScript", "REST APIs"],
  },
  {
    slug: "2d-sidescroller-game",
    title: "2D VerticalScroller Game",
    summary: "A 2D platformer built in Unity with custom gameplay mechanics, collision handling, and progress tracking.",
    tech: ["Unity", "C#"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
      </header>

      <ol className="space-y-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group flex items-start justify-between gap-6 rounded-xl border border-border p-6 transition-colors hover:bg-accent/40"
            >
              <div className="min-w-0">
                <h2 className="text-base font-semibold mb-1 group-hover:text-foreground">
                  {project.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="tech">{t}</Badge>
                  ))}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
