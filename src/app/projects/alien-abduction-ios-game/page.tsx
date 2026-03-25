import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ScreenshotGallery from "./screenshot-gallery";

export const metadata: Metadata = {
  title: "Alien Abduction iOS Mobile Game",
  description: "An endless side-scrolling SpriteKit game where you pilot an alien saucer, abducting creatures while avoiding obstacles.",
};

const screenshots = [
  "/projects/alien-abduction/IMG_0307.PNG",
  "/projects/alien-abduction/IMG_0308.PNG",
  "/projects/alien-abduction/IMG_0309.PNG",
  "/projects/alien-abduction/IMG_0311.PNG",
  "/projects/alien-abduction/IMG_0312.PNG",
  "/projects/alien-abduction/IMG_0314.PNG",
  "/projects/alien-abduction/IMG_0313.PNG",
];

export default function AlienAbductionPage() {
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
        <h1 className="text-4xl font-bold tracking-tight mb-4">Alien Abduction iOS Mobile Game</h1>
        <div className="flex flex-wrap gap-2">
          {["Swift", "SpriteKit", "GameKit", "AVFoundation", "iCloud", "Claude Code"].map((t) => (
            <Badge key={t} variant="tech">{t}</Badge>
          ))}
        </div>
      </header>

      <Separator className="mb-10" />

      <section className="space-y-4 text-muted-foreground leading-relaxed mb-10">
        <p>
          An endless side-scrolling iOS game built with SpriteKit where you pilot an alien saucer,
          abducting creatures while avoiding obstacles across three dynamically changing environments.
        </p>
        <p>
          Control a UFO flying across ocean, grassland, and city environments. Use your tractor beam
          to abduct creatures for points while dodging planes, terrain, and obstacles. The longer you
          survive, the faster and harder it gets. Plane spawn rate ramps from one every 2.5 seconds
          to three per second over four minutes.
        </p>
        <p>
          Game is currently under-going beta testing and will be seeking App Store publishment soon.
          Monetization will also be added via Google AdMob.
        </p>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
        <ScreenshotGallery screenshots={screenshots} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Gameplay Video</h2>
        <div className="rounded-xl overflow-hidden border border-border bg-black max-w-xs">
          <video
            controls
            playsInline
            className="w-full"
            poster="/projects/alien-abduction/IMG_0307.PNG"
          >
            <source src="/projects/alien-abduction/gameplay.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
}
