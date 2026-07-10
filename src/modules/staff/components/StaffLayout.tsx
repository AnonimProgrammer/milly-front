"use client";

import type { ReactNode } from "react";
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
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 p-6 font-sans text-black dark:text-zinc-50 antialiased">
      <StaffHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 pt-4">
        <h2 className="text-center font-serif text-3xl font-normal tracking-wide text-black dark:text-zinc-100 sm:text-4xl">
          {membership.venueName}
        </h2>

        <StaffTabNav venueId={venueId} role={membership.role} />

        <div className="flex-1 bg-white dark:bg-zinc-950">{children}</div>
      </main>
    </div>
  );
}
