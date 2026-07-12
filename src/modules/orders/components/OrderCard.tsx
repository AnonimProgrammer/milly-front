"use client";

import { OrderPaymentDetails } from "@/modules/billing";
import type { Order } from "../types";
import { OrderActionButton } from "./OrderActionButton";
import { OrderCardHeader } from "./OrderCardHeader";
import { OrderItemList } from "./OrderItemList";
import { OrderPendingAddition } from "./OrderPendingAddition";
import { OrderRejectedAddition } from "./OrderRejectedAddition";

type OrderCardProps = {
  order: Order;
  onApproveOrder: (orderId: string) => void;
  onRejectOrder: (orderId: string) => void;
  onCloseOrder: (orderId: string) => void;
};

export function OrderCard({
  order,
  onApproveOrder,
  onRejectOrder,
  onCloseOrder,
}: OrderCardProps) {
  const hasPendingAddition = order.pendingAddition?.status === "pending";

  return (
    <li className="overflow-hidden rounded-2xl border border-border bg-card">
      <OrderCardHeader order={order} hasPendingAddition={Boolean(hasPendingAddition)} />

      <div className="p-5">
        {order.status === "pending" ? (
          <OrderItemList items={order.items} />
        ) : order.items.length > 0 ? (
          <div className="mb-1">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              On the bill
            </p>
            <OrderItemList items={order.items} />
          </div>
        ) : null}

        {order.status === "pending" ? (
          <div className="mt-5 flex gap-3">
            <OrderActionButton variant="secondary" onClick={() => onRejectOrder(order.id)}>
              Reject
            </OrderActionButton>
            <OrderActionButton onClick={() => onApproveOrder(order.id)}>Approve</OrderActionButton>
          </div>
        ) : null}

        {hasPendingAddition && order.pendingAddition ? (
          <OrderPendingAddition
            addition={order.pendingAddition}
            onApprove={() => onApproveOrder(order.id)}
            onReject={() => onRejectOrder(order.id)}
          />
        ) : null}

        {order.rejectedAdditions.map((addition) => (
          <OrderRejectedAddition key={addition.id} addition={addition} />
        ))}

        {(order.status === "approved" || order.status === "completed") &&
        order.items.length > 0 ? (
          <OrderPaymentDetails order={order} onCloseOrder={onCloseOrder} />
        ) : null}
      </div>
    </li>
  );
}
