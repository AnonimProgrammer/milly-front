"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { VenueRole } from "@/modules/venue";
import {
  getStaffSectionFromPath,
  staffPath,
  type StaffSection,
} from "../utils/staffRoutes";

type TabOption = {
  id: StaffSection;
  label: string;
  managerOnly: boolean;
};

type StaffTabNavProps = {
  venueId: string;
  role: VenueRole;
};

const tabs: TabOption[] = [
  { id: "orders", label: "Orders", managerOnly: false },
  { id: "menu", label: "Menu", managerOnly: true },
  { id: "tables", label: "Tables", managerOnly: true },
  { id: "members", label: "Staff", managerOnly: true },
];

export function StaffTabNav({ venueId, role }: StaffTabNavProps) {
  const pathname = usePathname();
  const activeTab = getStaffSectionFromPath(pathname) ?? "orders";
  const visibleTabs = tabs.filter((tab) => !tab.managerOnly || role === "MANAGER");

  return (
    <div className="w-full border-b border-zinc-100 dark:border-zinc-800 pb-4">
      <nav className="flex flex-wrap justify-center gap-2.5" aria-label="Staff Portal Tabs">
        {visibleTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={staffPath(venueId, tab.id)}
              className={`rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-black dark:hover:text-zinc-100"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
