"use client";

import type { Order } from "../types";
import { formatDateTime, formatOrderId } from "../utils/order.helpers";

type OrderCardHeaderProps = {
  order: Order;
  hasPendingAddition: boolean;
};

export function OrderCardHeader({ order, hasPendingAddition }: OrderCardHeaderProps) {
  const showUpdated = order.updatedAt.getTime() > order.createdAt.getTime() + 1000;

  return (
    <div className="border-b border-border bg-muted px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-foreground">
            {order.tableLabel}{" "}
            <span className="text-base font-normal text-muted-foreground">
              {formatOrderId(order.id)}
            </span>
          </p>
          <div className="mt-1.5 space-y-0.5 text-sm text-muted-foreground">
            <p>Created {formatDateTime(order.createdAt)}</p>
            {showUpdated ? <p>Updated {formatDateTime(order.updatedAt)}</p> : null}
            {order.status === "approved" && order.estimatedPreparationDisplay ? (
              <p>Prep estimate: {order.estimatedPreparationDisplay}</p>
            ) : null}
          </div>
        </div>
        <OrderStatusBadge status={order.status} hasPendingAddition={hasPendingAddition} />
      </div>
    </div>
  );
}

function OrderStatusBadge({
  status,
  hasPendingAddition,
}: {
  status: Order["status"];
  hasPendingAddition: boolean;
}) {
  if (status === "completed") {
    return (
      <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
        Completed
      </span>
    );
  }

  if (status === "approved" && !hasPendingAddition) {
    return (
      <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
        Approved
      </span>
    );
  }

  if (status === "pending" || hasPendingAddition) {
    return (
      <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
        Pending
      </span>
    );
  }

  return null;
}
