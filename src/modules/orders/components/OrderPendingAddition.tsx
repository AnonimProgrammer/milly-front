"use client";

import type { OrderAddition } from "../types";
import {
  formatAmount,
  formatDateTime,
  getOrderTotal,
} from "../utils/order.helpers";
import { OrderActionButton } from "./OrderActionButton";
import { OrderItemList } from "./OrderItemList";

type OrderPendingAdditionProps = {
  addition: OrderAddition;
  onApprove: () => void;
  onReject: () => void;
};

export function OrderPendingAddition({
  addition,
  onApprove,
  onReject,
}: OrderPendingAdditionProps) {
  return (
    <div className="mt-5 rounded-xl border border-dashed border-border bg-muted p-4">
      <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        New items · {formatDateTime(addition.createdAt)}
      </p>
      <OrderItemList items={addition.items} />
      <p className="mt-2.5 text-base font-medium text-foreground">
        {formatAmount(getOrderTotal(addition.items))}
      </p>
      <div className="mt-4 flex gap-3">
        <OrderActionButton variant="secondary" onClick={onReject}>
          Reject
        </OrderActionButton>
        <OrderActionButton onClick={onApprove}>Approve</OrderActionButton>
      </div>
    </div>
  );
}
