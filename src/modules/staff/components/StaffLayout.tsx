"use client";

import type { ReactNode } from "react";
import { pageShell } from "@/modules/shared/theme/classNames";
import { useVenueMembership } from "@/modules/venue";
import { StaffHeader } from "./StaffHeader";
import { StaffTabNav } from "./StaffTabNav";

type StaffLayoutProps = {
  venueId: string;
  children: ReactNode;
};

export function StaffLayout({ venueId, children }: StaffLayoutProps) {
  const membership = useVenueMembership();

  return (
    <div className={`flex min-h-screen flex-col bg-transparent p-3 sm:p-6 ${pageShell}`}>
      <StaffHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 pt-2 sm:gap-6 sm:pt-4">
        <h2 className="text-center font-serif text-2xl font-normal tracking-wide text-foreground sm:text-4xl">
          {membership.venueName}
        </h2>

        <StaffTabNav venueId={venueId} role={membership.role} />

        <div className="flex-1 bg-transparent">{children}</div>
      </main>
    </div>
  );
}
