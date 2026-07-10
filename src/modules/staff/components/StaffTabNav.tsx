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
    <div className="w-full border-b border-border pb-4">
      <nav className="flex flex-wrap justify-center gap-2.5" aria-label="Staff Portal Tabs">
        {visibleTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={staffPath(venueId, tab.id)}
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
    </div>
  );
}
