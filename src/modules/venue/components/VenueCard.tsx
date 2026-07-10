import type { ReactNode } from "react";

type VenueCardProps = {
  children: ReactNode;
};

export function VenueCard({ children }: VenueCardProps) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/25 flex flex-col">
      {children}
    </div>
  );
}
