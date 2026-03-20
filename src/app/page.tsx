import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Amrit Banga",
};

export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-start pt-32 sm:pt-40 gap-8">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
        Amrit Banga
      </h1>
      <div className="relative w-72 sm:w-96 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="/images/graduation.jpeg"
          alt="Amrit Banga at graduation"
          fill
          className="object-cover object-top"
          priority
        />
      </div>
      <Link
        href="https://www.linkedin.com/in/amrit-banga-1bb794260/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </Link>
    </section>
  );
}
