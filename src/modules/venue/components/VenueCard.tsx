import type { ReactNode } from "react";
import { surfacePanel } from "@/modules/shared/theme/classNames";

type VenueCardProps = {
  children: ReactNode;
};

export function VenueCard({ children }: VenueCardProps) {
  return (
    <div className={`w-full p-6 sm:p-8 flex flex-col ${surfacePanel}`}>
      {children}
    </div>
  );
}
