import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description: "About Amrit Banga — CS student, software developer, and ex-Division I athlete at Washington State University.",
};

const skillCategories = [
  {
    category: "Languages",
    skills: ["Java", "C#", "Swift", "Python", "SQL"],
  },
  {
    category: "Tools & Frameworks",
    skills: ["Git", "Microsoft SQL Server", "Unity", "Visual Studio", "Xcode", "Firebase", "VS Code", "Avalonia UI", "Claude Code"],
  },
];

const experience = [
  {
    role: "Software Developer",
    company: "Forest Resource Analysis System Software (FRASS)",
    period: "August 2025 – Present",
    location: "Remote",
    highlights: [
      "Led a 3-person development team enhancing FRASS, a forestry analytics platform used by land managers to estimate timber value and harvest timing",
      "Organized development and sprint meetings, managed task priorities, and documented feature requirements",
      "Proposed, designed, and shipped usability improvements across 4+ stand-analysis modules, introducing sticky headers and persistent rotation controls",
      "Expanded the historic log pricing and timber species model by introducing new pricing/classification attributes integrated with a Microsoft SQL Server backend",
      "Led ingestion of ~3,500 forestry datasets, building automated data transformation workflows enabling structured querying across ~12,000 tree-level records per stand per year",
    ],
  },
  {
    role: "Apple Specialist",
    company: "Apple — Lynnwood, Washington",
    period: "June 2022 – July 2023",
    location: "Lynnwood, WA",
    highlights: [
      "Delivered consultative product recommendations on Apple devices, translating technical capabilities into user-focused solutions",
      "Consistently drove AppleCare+ adoption in a high-volume retail environment",
    ],
  },
];

const projects = [
  {
    title: "2D Vertical/Side Scroller",
    tech: "Unity / C#",
    period: "Fall 2024",
    highlights: [
      "Developed a 2D platformer in Unity within a 3-person team, defining gameplay mechanics and implementing player interaction systems",
      "Engineered 5+ gameplay mechanics including progress tracking UI, collision handling, and state management",
    ],
  },
  {
    title: "Spreadsheet Application",
    tech: "C# / Avalonia UI",
    period: "Fall 2024",
    highlights: [
      "Built a spreadsheet engine supporting cell references, dependency-based recalculation, and persistent file storage",
      "Developed validation logic backed by 30+ NUnit unit tests",
    ],
  },
  {
    title: "Inventory Management Mobile App",
    tech: "Swift / SwiftUI / Firebase",
    period: "Summer 2023",
    highlights: [
      "Implemented secure login/logout workflows and two-factor authentication",
      "Integrated Firebase for real-time data storage and user authentication",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-4xl font-bold tracking-tight mb-3">About Me</h1>
          <Link
            href="https://www.linkedin.com/in/amrit-banga-1bb794260/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </Link>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>Bothell, Washington</span>
        </div>
      </header>

      {/* Bio */}
      <section aria-labelledby="bio-heading" className="mb-12">
        <h2 id="bio-heading" className="text-xl font-semibold mb-4">Bio</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Hi I&apos;m Amrit, a Computer Science student at Washington State University,
            graduating in 2026, with a Minor in Mathematics. I build software and lead small
            engineering teams. My background spans full-stack development, database design,
            and game development.
          </p>
          <p>
            I&apos;m also a retired Division I athlete, I competed in Cross Country and Track
            at WSU, earned Pac-12 Scholar Athlete honors, and landed on the President&apos;s
            Honor Roll six times. Outside of school and work I&apos;m a runner, mountain
            climber, and fisherman. I also dabble in photography on the side.
          </p>
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Skills */}
      <section aria-labelledby="skills-heading" className="mb-12">
        <h2 id="skills-heading" className="text-xl font-semibold mb-6">
          Skills &amp; Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillCategories.map(({ category, skills }) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="tech">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Education */}
      <section aria-labelledby="education-heading" className="mb-12">
        <h2 id="education-heading" className="text-xl font-semibold mb-6">
          Education
        </h2>
        <div>
          <h3 className="text-base font-semibold">B.S. Computer Science, Minor in Mathematics</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Washington State University — Voiland College of Engineering</p>
          <div className="flex flex-wrap gap-3 mt-2 mb-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Graduating 2026
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              Pullman, WA
            </span>
          </div>
          <ul className="space-y-1.5">
            {[
              "Relevant coursework: Machine Learning, Advanced Data Structures, Databases, Product Management",
              "Student Athlete — Cross Country & Track (Division I)",
              "Pac-12 Scholar Athlete & 6× President's Honor Roll",
            ].map((point, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-foreground/40">→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mb-12">
        <h2 id="experience-heading" className="text-xl font-semibold mb-8">
          Experience
        </h2>
        <ol className="relative border-l border-border ml-4 space-y-10">
          {experience.map((item, index) => (
            <li key={index} className="ml-6">
              <span
                aria-hidden="true"
                className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background"
              >
                <Briefcase className="h-3 w-3 text-muted-foreground" />
              </span>
              <div>
                <h3 className="text-base font-semibold leading-snug mb-1">{item.role}</h3>
                <p className="text-sm text-muted-foreground mb-1">{item.company}</p>
                <div className="flex flex-wrap gap-3 mb-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {item.highlights.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span aria-hidden="true" className="mt-0.5 shrink-0 text-foreground/40">→</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Separator className="mb-12" />

      {/* Academic Projects */}
      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="text-xl font-semibold mb-8">
          Academic Projects
        </h2>
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.title}>
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <h3 className="text-base font-semibold">{project.title}</h3>
                <span className="text-xs text-muted-foreground font-mono">{project.tech}</span>
                <span className="text-xs text-muted-foreground ml-auto">{project.period}</span>
              </div>
              <ul className="space-y-1.5">
                {project.highlights.map((point, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-foreground/40">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
