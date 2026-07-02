import type { ReactNode } from "react";

type VenueCardProps = {
  children: ReactNode;
};

export function VenueCard({ children }: VenueCardProps) {
  return (
    <div className="w-full bg-white border border-black/10 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 flex flex-col">
      {children}
    </div>
  );
}
