"use client";

import type { ReactNode } from "react";
import { Suspense } from "react";
import { pageMain, surfacePanel, tabActive, tabInactive, textMuted } from "@/modules/shared/theme/classNames";
import { PageHeader } from "@/modules/shared/ui";
import { AccountBackNav } from "./AccountBackNav";
import { AccountTabNav } from "./AccountTabNav";

type AccountLayoutProps = {
  children: ReactNode;
};

function AccountTabNavFallback() {
  return (
    <nav
      className="flex flex-wrap justify-center gap-2.5 border-b border-border pb-4"
      aria-label="Account sections"
    >
      <span className={`rounded-xl px-6 py-2.5 text-sm font-medium ${tabActive}`}>
        Profile
      </span>
      <span className={`rounded-xl px-6 py-2.5 text-sm font-medium ${tabInactive}`}>
        Settings
      </span>
    </nav>
  );
}

export function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className={`relative flex min-h-screen flex-col overflow-hidden ${pageMain}`}>
      <div className="z-10 w-full px-6 pt-6">
        <PageHeader leading={<AccountBackNav />} />
      </div>

      <main className="z-10 mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-6 py-8">
        <Suspense fallback={<AccountTabNavFallback />}>
          <AccountTabNav />
        </Suspense>

        <div className={`flex flex-col gap-8 p-8 shadow-2xl sm:p-10 ${surfacePanel}`}>
          {children}
        </div>
      </main>

      <footer className={`z-10 w-full max-w-xl mx-auto px-6 py-4 text-center text-xs font-light ${textMuted}`}>
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </div>
  );
}
