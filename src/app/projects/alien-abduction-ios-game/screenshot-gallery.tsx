"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function ScreenshotGallery({ screenshots }: { screenshots: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {screenshots.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(src)}
            className="rounded-lg overflow-hidden border border-border bg-black shrink-0 w-28 aspect-[9/19.5] cursor-zoom-in hover:opacity-80 transition-opacity"
          >
            <Image
              src={src}
              alt={`Alien Abduction screenshot ${i + 1}`}
              width={200}
              height={433}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-h-[90vh] rounded-xl overflow-hidden border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active}
              alt="Screenshot"
              width={390}
              height={844}
              className="max-h-[90vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
