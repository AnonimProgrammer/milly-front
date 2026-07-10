"use client";

import { useState, type ReactNode } from "react";
import type { OrderItem } from "../types";

const DEFAULT_COLLAPSE_THRESHOLD = 3;

type CollapsibleOrderItemListProps = {
  items: OrderItem[];
  collapseThreshold?: number;
  listClassName?: string;
  itemClassName?: string;
  renderItem: (item: OrderItem) => ReactNode;
  getItemKey?: (item: OrderItem) => string;
  expandButtonClassName?: string;
};

function getDefaultItemKey(item: OrderItem): string {
  return item.menuItemId;
}

export function CollapsibleOrderItemList({
  items,
  collapseThreshold = DEFAULT_COLLAPSE_THRESHOLD,
  listClassName,
  itemClassName,
  renderItem,
  getItemKey = getDefaultItemKey,
  expandButtonClassName = "mt-2 text-sm font-medium text-muted-foreground underline hover:text-foreground",
}: CollapsibleOrderItemListProps) {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = items.length > collapseThreshold;
  const visibleItems = expanded || !hasOverflow ? items : items.slice(0, collapseThreshold);
  const hiddenCount = items.length - collapseThreshold;

  return (
    <div>
      <ul className={listClassName}>
        {visibleItems.map((item) => (
          <li key={getItemKey(item)} className={itemClassName}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
      {hasOverflow && !expanded ? (
        <button type="button" onClick={() => setExpanded(true)} className={expandButtonClassName}>
          Expand ({hiddenCount} more)
        </button>
      ) : null}
      {hasOverflow && expanded ? (
        <button type="button" onClick={() => setExpanded(false)} className={expandButtonClassName}>
          Collapse
        </button>
      ) : null}
    </div>
  );
}
