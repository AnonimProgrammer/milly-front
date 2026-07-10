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
      className="flex flex-wrap justify-center gap-2.5 border-b border-border pb-4"
      aria-label="Account sections"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const href = returnTo ? withReturnTo(tab.path, returnTo) : tab.path;

        return (
          <Link
            key={tab.id}
            href={href}
            className={`rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
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
