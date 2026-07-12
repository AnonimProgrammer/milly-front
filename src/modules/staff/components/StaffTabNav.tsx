"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tabActive, tabInactive } from "@/modules/shared/theme/classNames";
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
    <div className="w-full border-b border-border pb-3 sm:pb-4">
      <nav
        className="flex w-full gap-1 sm:justify-center sm:gap-2.5"
        aria-label="Staff Portal Tabs"
      >
        {visibleTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={staffPath(venueId, tab.id)}
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
