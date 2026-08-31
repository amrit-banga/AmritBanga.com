import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ScreenshotGallery from "./screenshot-gallery";

export const metadata: Metadata = {
  title: "Alien Abduction iOS Mobile Game",
  description:
    "An endless side-scrolling SpriteKit game where you pilot an alien saucer, abducting creatures while avoiding obstacles.",
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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Link
        href="/projects"
        className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Projects
      </Link>

      <header className="mb-10">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Alien Abduction iOS Mobile Game
        </h1>

        <div className="flex flex-wrap gap-2">
          {[
            "Swift",
            "SpriteKit",
            "GameKit",
            "AVFoundation",
            "iCloud",
            "Claude Code",
          ].map((technology) => (
            <Badge key={technology} variant="tech">
              {technology}
            </Badge>
          ))}
        </div>
      </header>

      <Separator className="mb-10" />

      <section className="mb-10 space-y-4 leading-relaxed text-muted-foreground">
        <p>
          An endless side-scrolling iOS game built with SpriteKit where you
          pilot an alien saucer, abducting creatures while avoiding obstacles
          across three dynamically changing environments.
        </p>

        <p>
          Control a UFO flying across ocean, grassland, and city environments.
          Use your tractor beam to abduct creatures for points while dodging
          planes, terrain, and obstacles. The longer you survive, the faster and
          harder it gets. Plane spawn rate ramps from one every 2.5 seconds to
          three per second over four minutes.
        </p>

        <p>The game is now live on the Apple App Store!</p>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Screenshots</h2>
        <ScreenshotGallery screenshots={screenshots} />
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Gameplay Video</h2>

        <div className="max-w-xs overflow-hidden rounded-xl border border-border bg-black">
          <video
            controls
            playsInline
            className="w-full"
            poster="/projects/alien-abduction/IMG_0307.PNG"
          >
            <source
              src="/projects/alien-abduction/gameplay.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Privacy Policy</h2>

        <div className="space-y-6 leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">Last updated:</strong> August
            31, 2026
          </p>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">Overview</h3>

            <p>
              Alien Abduction does not require users to create an account with
              the developer. The developer does not operate an advertising,
              analytics, or gameplay-data server.
            </p>

            <p className="mt-2">
              The game stores limited gameplay information and preferences to
              provide features such as saved statistics, leaderboards,
              achievements, and restoration after reinstalling the game.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">
              Information Stored by the Game
            </h3>

            <p>
              Alien Abduction stores the following information locally on the
              user’s device:
            </p>

            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Best score</li>
              <li>Creature catch totals</li>
              <li>Music and sound preferences</li>
              <li>Whether the introductory controls screen has been shown</li>
            </ul>

            <p className="mt-3">
              This information is used only to provide game functionality.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">iCloud</h3>

            <p>
              Alien Abduction uses Apple’s iCloud Key-Value Storage service to
              synchronize gameplay statistics and preferences between devices
              and restore them after the game is reinstalled.
            </p>

            <p className="mt-2">
              This information may be associated with the user’s Apple Account
              by Apple for synchronization purposes. The developer does not
              receive the user’s Apple Account credentials and does not have a
              separate server containing this information.
            </p>

            <p className="mt-2">
              Users must be signed into iCloud for synchronization and
              restoration to work. Gameplay information stored in iCloud may
              remain available after the app is deleted so it can be restored
              if the game is reinstalled.
            </p>

            <p className="mt-2">
              Information stored through iCloud is handled by Apple according
              to{" "}
              <a
                href="https://www.apple.com/legal/privacy/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Apple’s Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">
              Game Center
            </h3>

            <p>
              Alien Abduction uses Apple’s Game Center service to provide
              leaderboards and achievements. The game may submit information
              including:
            </p>

            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Best scores</li>
              <li>Achievement progress</li>
              <li>Related gameplay activity required for these features</li>
            </ul>

            <p className="mt-3">
              Depending on the user’s Game Center settings, information such as
              their Game Center nickname, avatar, scores, and achievements may
              be visible to other Game Center users.
            </p>

            <p className="mt-2">
              Game Center information is collected and processed by Apple
              according to{" "}
              <a
                href="https://www.apple.com/legal/privacy/data/en/game-center/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Game Center &amp; Privacy
              </a>{" "}
              and{" "}
              <a
                href="https://www.apple.com/legal/privacy/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Apple’s Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">
              Advertising and Tracking
            </h3>

            <p>
              Alien Abduction does not use gameplay information for advertising
              or tracking. The developer does not sell or share gameplay
              information with advertisers or data brokers.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">
              Data Management
            </h3>

            <p>
              Users can manage their iCloud and Game Center accounts using the
              settings and controls provided by Apple.
            </p>

            <p className="mt-2">
              Deleting Alien Abduction removes information stored locally by
              the app. Information previously synchronized through iCloud or
              submitted to Game Center may remain associated with the user’s
              Apple Account according to Apple’s retention and privacy
              practices.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">
              Contacting the Developer
            </h3>

            <p>
              If a user contacts the developer by email, the developer may
              receive the user’s email address and any information included in
              the message. This information will be used only to respond to the
              request and will not be used for advertising or tracking.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">
              Data Security
            </h3>

            <p>
              The developer does not maintain a separate database containing
              users’ gameplay statistics. Information synchronized through
              iCloud or submitted to Game Center is protected and processed
              using Apple’s systems and security practices.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">
              Children’s Privacy
            </h3>

            <p>
              Alien Abduction does not knowingly request or directly collect
              personal information from children. The game does not include
              developer-operated account registration, messaging, advertising,
              or tracking features.
            </p>

            <p className="mt-2">
              Apple services, including iCloud and Game Center, are governed by
              Apple’s privacy practices and the settings associated with the
              user’s Apple Account.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">
              Changes to This Privacy Policy
            </h3>

            <p>
              This Privacy Policy may be updated when the game’s features or
              data practices change. Any updates will be posted on this page
              with a revised “Last updated” date.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-foreground">Contact</h3>

            <p>For questions about this Privacy Policy, contact:</p>

            <div className="mt-2">
              <p className="font-medium text-foreground">Amrit Banga</p>

              <a
                href="mailto:amrit.banga@outlook.com"
                className="text-primary hover:underline"
              >
                amrit.banga@outlook.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
