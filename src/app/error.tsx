"use client";

/**
 * Global error boundary — catches unhandled errors in the route segment.
 * Must be a Client Component (Next.js requirement).
 */
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to your error tracking service here (e.g. Sentry)
    console.error("[Global error boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <AlertTriangle
        className="h-12 w-12 text-destructive mb-4"
        aria-hidden="true"
      />
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-muted-foreground mb-6 max-w-sm">
        An unexpected error occurred. Try refreshing, or head back home.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline">
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
