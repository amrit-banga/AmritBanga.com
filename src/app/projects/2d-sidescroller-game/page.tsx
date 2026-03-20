import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "2D VerticalScroller Game",
  description: "A 2D platformer built in Unity with custom gameplay mechanics, collision handling, and progress tracking.",
};

export default function SidescrollerGamePage() {
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
        <h1 className="text-4xl font-bold tracking-tight mb-4">2D VerticalScroller Game</h1>
        <div className="flex flex-wrap gap-2">
          {["Unity", "C#"].map((t) => (
            <Badge key={t} variant="tech">{t}</Badge>
          ))}
        </div>
      </header>

      <Separator className="mb-10" />

      <section className="space-y-4 text-muted-foreground leading-relaxed mb-10">
        <p>
          A 2D platformer developed in Unity as part of a 4-person team. The game features
          a vertical-scrolling level with a focus on tight gameplay feel and responsive controls.
        </p>
        <p>
          I engineered some of the core player systems, including collision handling, dynamic
          camera controls, state management, and a progress tracking UI that persists across
          checkpoints. We shipped 5+ distinct gameplay mechanics over the course of the project.
        </p>
      </section>

      <Separator className="mb-10" />

      <section>
        <h2 className="text-xl font-semibold mb-4">Play in Browser</h2>
        <div className="rounded-xl overflow-hidden border border-border bg-black w-full" style={{aspectRatio: "960/600"}}>
          <iframe
            src="/games/ascension/index.html"
            className="w-full h-full"
            allow="fullscreen"
            title="Ascension — 2D Sidescroller Game"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Click the game to focus it. Use keyboard controls to play.
        </p>
      </section>
    </div>
  );
}
