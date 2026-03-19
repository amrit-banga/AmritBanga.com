import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Amrit Banga.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight">Data Intelligence Dashboard</h1>
    </div>
  );
}
