"use client";

import { UserAccountNav } from "@/modules/auth/components/UserAccountNav";
import { BrandBackNav, PageHeader } from "@/modules/shared/ui";
import { JoinVenueSection } from "./JoinVenueSection";
import { MyVenuesSection } from "./MyVenuesSection";

export function JoinVenuePage() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white font-sans antialiased relative overflow-hidden p-6">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-black/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-black/5 blur-[80px] pointer-events-none" />

      <PageHeader leading={<BrandBackNav />} trailing={<UserAccountNav />} />

      <div className="flex-1 flex flex-col items-center justify-center py-8 z-10 w-full max-w-md mx-auto gap-6">
        <MyVenuesSection />
        <JoinVenueSection />
      </div>

      <footer className="w-full max-w-7xl mx-auto py-4 text-center text-xs text-zinc-500 z-10 font-light">
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </main>
  );
}
