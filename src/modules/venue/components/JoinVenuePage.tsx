"use client";

import { UserAccountNav } from "@/modules/auth";
import { pageMain, selectionTheme, textMuted } from "@/modules/shared/theme/classNames";
import { BrandBackNav, PageHeader } from "@/modules/shared/ui";
import { JoinVenueSection } from "./JoinVenueSection";
import { MyVenuesSection } from "./MyVenuesSection";

export function JoinVenuePage({ inviteToken }: { inviteToken?: string }) {
  return (
    <main className={`min-h-screen flex flex-col justify-between p-6 ${pageMain} ${selectionTheme}`}>
      <PageHeader leading={<BrandBackNav />} trailing={<UserAccountNav />} />

      <div className="flex-1 flex flex-col items-center justify-center py-8 z-10 w-full max-w-md mx-auto gap-6">
        <MyVenuesSection />
        <JoinVenueSection initialInviteCode={inviteToken ?? ""} />
      </div>

      <footer className={`w-full max-w-7xl mx-auto py-4 text-center text-xs z-10 font-light ${textMuted}`}>
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </main>
  );
}
