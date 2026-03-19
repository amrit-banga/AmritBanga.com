/**
 * Global loading UI — shown while route segments are streaming.
 * Uses a simple animated skeleton to avoid layout shift.
 * Server Component (no "use client" needed).
 */
export default function GlobalLoading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      aria-label="Loading page…"
      role="status"
    >
      {/* Pulsing logo mark */}
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
        <div className="h-4 w-24 rounded-md bg-muted animate-pulse" />
      </div>
    </div>
  );
}
