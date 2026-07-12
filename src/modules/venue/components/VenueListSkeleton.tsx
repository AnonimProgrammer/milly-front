"use client";

export function VenueListSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2.5">
      {[1, 2].map((i) => (
        <div key={i} className="h-12 rounded-2xl bg-muted" />
      ))}
    </div>
  );
}
