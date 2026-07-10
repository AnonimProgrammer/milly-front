import type { ReactNode } from "react";
import { pageMain, selectionTheme, textMuted } from "@/modules/shared/theme/classNames";
import { BrandBackNav } from "@/modules/shared/ui";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className={`min-h-screen flex flex-col justify-between p-6 ${pageMain} ${selectionTheme}`}>
      <header className="w-full max-w-7xl mx-auto py-2 z-10">
        <BrandBackNav />
      </header>

      <div className="flex-1 flex items-center justify-center py-10 z-10">{children}</div>

      <footer className={`w-full max-w-7xl mx-auto py-4 text-center text-xs z-10 font-light ${textMuted}`}>
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </main>
  );
}
