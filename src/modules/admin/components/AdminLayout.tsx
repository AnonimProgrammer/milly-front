"use client";

import type { ReactNode } from "react";
import { pageShell } from "@/modules/shared/theme/classNames";
import { AdminHeader } from "./AdminHeader";
import { AdminTabNav } from "./AdminTabNav";

type AdminLayoutProps = {
  children: ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={`flex min-h-screen flex-col bg-transparent p-3 sm:p-6 ${pageShell}`}>
      <AdminHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 pt-2 sm:gap-6 sm:pt-4">
        <AdminTabNav />

        <div className="flex-1 bg-transparent">{children}</div>
      </main>
    </div>
  );
}
