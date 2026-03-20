import type { Metadata } from "next";
import Image from "next/image";

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
    </section>
  );
}
