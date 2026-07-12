"use client";

import { textMuted } from "@/modules/shared/theme/classNames";
import type { MenuItem } from "../types";

type MenuItemRowProps = {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
};

export function MenuItemRow({ item, onEdit, onDelete }: MenuItemRowProps) {
  return (
    <div className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-muted/50">
      <div className="flex flex-col gap-1 pr-6">
        <span className="text-sm font-bold text-foreground">{item.name}</span>
        <span className={`line-clamp-2 text-xs font-light ${textMuted}`}>
          {item.description}
        </span>
        <span className={`mt-1 text-xs font-light ${textMuted}`}>
          {item.category} &middot; {item.price.toFixed(2)} ₼ &middot; ~
          {item.approximatePreparationMinutes} min prep
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className={`cursor-pointer text-xs font-light transition-colors hover:text-foreground ${textMuted}`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className={`cursor-pointer text-xs font-light transition-colors hover:text-foreground ${textMuted}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
