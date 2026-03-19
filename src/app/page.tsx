import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Amrit Banga",
};

export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-start justify-center pt-32 sm:pt-40">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
        Amrit Banga
      </h1>
    </section>
  );
}
