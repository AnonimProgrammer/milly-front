"use client";

import type { OrderItem } from "../types";
import { CollapsibleOrderItemList } from "./CollapsibleOrderItemList";

type OrderItemListProps = {
  items: OrderItem[];
};

export function OrderItemList({ items }: OrderItemListProps) {
  return (
    <CollapsibleOrderItemList
      items={items}
      listClassName="space-y-1.5 text-base text-foreground"
      renderItem={(item) => (
        <>
          {item.quantity}× {item.name}
        </>
      )}
    />
  );
}
