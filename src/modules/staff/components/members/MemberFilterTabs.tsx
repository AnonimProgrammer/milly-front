"use client";

import { spinnerRing, tabActive, tabInactive, textMuted } from "@/modules/shared/theme/classNames";
import {
  memberCountLabel,
  memberListFilters,
  type MemberListFilter,
} from "../../utils/memberFilters";

type MemberFilterTabsProps = {
  filter: MemberListFilter;
  memberCount: number;
  isRefreshing: boolean;
  onFilterChange: (filter: MemberListFilter) => void;
};

export function MemberFilterTabs({
  filter,
  memberCount,
  isRefreshing,
  onFilterChange,
}: MemberFilterTabsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {memberListFilters.map((option) => (
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
          {isRefreshing ? "Updating..." : memberCountLabel(memberCount, filter)}
        </p>
        {isRefreshing ? <div className={`h-3.5 w-3.5 ${spinnerRing}`} aria-hidden="true" /> : null}
      </div>
    </div>
  );
}
