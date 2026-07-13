"use client";

import { spinnerRing, tabActive, tabInactive, textMuted } from "@/modules/shared/theme/classNames";
import {
  adminUserListFilters,
  type AdminUserListFilter,
} from "../../utils/userFilters";

type AdminUserFilterTabsProps = {
  filter: AdminUserListFilter;
  userCount: number;
  isRefreshing: boolean;
  onFilterChange: (filter: AdminUserListFilter) => void;
};

export function AdminUserFilterTabs({
  filter,
  userCount,
  isRefreshing,
  onFilterChange,
}: AdminUserFilterTabsProps) {
  const noun = userCount === 1 ? "user" : "users";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {adminUserListFilters.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onFilterChange(option.id)}
            disabled={isRefreshing}
            aria-pressed={filter === option.id}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-60 ${
              filter === option.id ? tabActive : tabInactive
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <p className={`text-xs font-medium ${textMuted}`}>
          {isRefreshing ? "Updating..." : `${userCount} ${noun}`}
        </p>
        {isRefreshing ? <div className={`h-3.5 w-3.5 ${spinnerRing}`} aria-hidden="true" /> : null}
      </div>
    </div>
  );
}
