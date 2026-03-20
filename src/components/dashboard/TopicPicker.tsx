"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TOPIC_OPTIONS, type TopicValue } from "@/lib/db";

interface TopicPickerProps {
  onSave: (topics: TopicValue[]) => void;
}

export function TopicPicker({ onSave }: TopicPickerProps) {
  const [selected, setSelected] = useState<Set<TopicValue>>(new Set());

  function toggle(value: TopicValue) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-3">What do you want to follow?</h1>
          <p className="text-muted-foreground">Pick the topics you care about. You can change these anytime.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {TOPIC_OPTIONS.map(({ value, label, emoji, description }) => {
            const active = selected.has(value);
            return (
              <button
                key={value}
                onClick={() => toggle(value)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors ${
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border hover:border-primary/50 hover:bg-accent text-muted-foreground"
                }`}
              >
                <span className="text-3xl">{emoji}</span>
                <span className="text-sm font-medium leading-tight">{label}</span>
                <span className="text-xs leading-tight opacity-70">{description}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            disabled={selected.size === 0}
            onClick={() => onSave(Array.from(selected))}
            className="px-10"
          >
            Get Started
            {selected.size > 0 && ` (${selected.size} topic${selected.size === 1 ? "" : "s"})`}
          </Button>
        </div>
      </div>
    </div>
  );
}
