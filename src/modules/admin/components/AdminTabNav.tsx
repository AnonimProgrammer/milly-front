"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tabActive, tabInactive } from "@/modules/shared/theme/classNames";
import {
  adminPath,
  getAdminSectionFromPath,
  type AdminSection,
} from "../utils/adminRoutes";

type TabOption = {
  id: AdminSection;
  label: string;
};

const tabs: TabOption[] = [{ id: "users", label: "Users" }];

export function AdminTabNav() {
  const pathname = usePathname();
  const activeTab = getAdminSectionFromPath(pathname) ?? "users";

  return (
    <div className="w-full border-b border-border pb-3 sm:pb-4">
      <nav
        className="flex w-full gap-1 sm:justify-center sm:gap-2.5"
        aria-label="Admin Console Tabs"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={adminPath(tab.id)}
              className={`min-w-0 flex-1 rounded-lg px-1.5 py-2 text-center text-xs font-medium transition-all duration-200 sm:flex-none sm:rounded-xl sm:px-6 sm:py-2.5 sm:text-sm ${
                isActive ? tabActive : tabInactive
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="block truncate">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
