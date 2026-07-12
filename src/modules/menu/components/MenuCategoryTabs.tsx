"use client";

import { tabActive, tabInactive } from "@/modules/shared/theme/classNames";

type MenuCategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function MenuCategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: MenuCategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {categories.map((menuCategory) => (
        <button
          key={menuCategory}
          type="button"
          onClick={() => onCategoryChange(menuCategory)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === menuCategory ? tabActive : tabInactive
          }`}
        >
          {menuCategory}
        </button>
      ))}
    </div>
  );
}
