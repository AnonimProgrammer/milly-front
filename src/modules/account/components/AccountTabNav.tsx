"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { readReturnTo, withReturnTo } from "@/modules/shared/navigation";
import { tabActive, tabInactive } from "@/modules/shared/theme/classNames";

const tabs = [
  { id: "profile", label: "Profile", path: "/settings/profile" },
  { id: "settings", label: "Settings", path: "/settings" },
] as const;

export function AccountTabNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnTo = readReturnTo(searchParams);
  const activeTab = pathname === "/settings/profile" ? "profile" : "settings";

  return (
    <nav
      className="flex flex-wrap justify-center gap-2 border-b border-border pb-3 sm:gap-2.5 sm:pb-4"
      aria-label="Account sections"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const href = returnTo ? withReturnTo(tab.path, returnTo) : tab.path;

        return (
          <Link
            key={tab.id}
            href={href}
            className={`rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 sm:rounded-xl sm:px-6 sm:py-2.5 sm:text-sm ${
              isActive ? tabActive : tabInactive
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
