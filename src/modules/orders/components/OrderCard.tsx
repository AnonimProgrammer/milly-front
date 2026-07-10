"use client";

import { OrderPaymentDetails } from "@/modules/billing";
import type { Order, OrderAddition, OrderItem } from "../types";
import {
  formatAmount,
  formatDateTime,
  formatOrderId,
  getOrderTotal,
} from "../utils/order.helpers";
import { CollapsibleOrderItemList } from "./CollapsibleOrderItemList";
import { OrderActionButton } from "./OrderActionButton";

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
  const showUpdated = order.updatedAt.getTime() > order.createdAt.getTime() + 1000;
  const hasPendingAddition = order.pendingAddition?.status === "pending";

  return (
    <li className="overflow-hidden rounded-2xl border border-border bg-card">
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
              {showUpdated && <p>Updated {formatDateTime(order.updatedAt)}</p>}
              {order.status === "approved" && order.estimatedPreparationDisplay && (
                <p>Prep estimate: {order.estimatedPreparationDisplay}</p>
              )}
            </div>
          </div>
          {order.status === "completed" && (
            <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              Completed
            </span>
          )}
          {order.status === "approved" && !hasPendingAddition && (
            <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
              Approved
            </span>
          )}
          {(order.status === "pending" || hasPendingAddition) && (
            <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
              Pending
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        {order.status === "pending" ? (
          <ItemList items={order.items} />
        ) : order.items.length > 0 ? (
          <div className="mb-1">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              On the bill
            </p>
            <ItemList items={order.items} />
          </div>
        ) : null}

        {order.status === "pending" && (
          <div className="mt-5 flex gap-3">
            <OrderActionButton variant="secondary" onClick={() => onRejectOrder(order.id)}>
              Reject
            </OrderActionButton>
            <OrderActionButton onClick={() => onApproveOrder(order.id)}>Approve</OrderActionButton>
          </div>
        )}

        {hasPendingAddition && order.pendingAddition && (
          <div className="mt-5 rounded-xl border border-dashed border-border bg-muted p-4">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              New items · {formatDateTime(order.pendingAddition.createdAt)}
            </p>
            <ItemList items={order.pendingAddition.items} />
            <p className="mt-2.5 text-base font-medium text-foreground">
              {formatAmount(getOrderTotal(order.pendingAddition.items))}
            </p>
            <div className="mt-4 flex gap-3">
              <OrderActionButton variant="secondary" onClick={() => onRejectOrder(order.id)}>
                Reject
              </OrderActionButton>
              <OrderActionButton onClick={() => onApproveOrder(order.id)}>Approve</OrderActionButton>
            </div>
          </div>
        )}

        {order.rejectedAdditions.map((addition) => (
          <RejectedAddition key={addition.id} addition={addition} />
        ))}

        {(order.status === "approved" || order.status === "completed") &&
          order.items.length > 0 && (
            <OrderPaymentDetails order={order} onCloseOrder={onCloseOrder} />
          )}
      </div>
    </li>
  );
}

function ItemList({ items }: { items: OrderItem[] }) {
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

function RejectedAddition({ addition }: { addition: OrderAddition }) {
  return (
    <div className="mt-5 rounded-xl border border-border bg-muted/50 p-4 opacity-70">
      <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground line-through">
        Rejected · {formatDateTime(addition.createdAt)}
      </p>
      <ul className="space-y-1.5 text-base text-muted-foreground">
        {addition.items.map((item) => (
          <li key={item.menuItemId} className="line-through">
            {item.quantity}× {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
