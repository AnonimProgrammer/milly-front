"use client";

import { useMemo } from "react";
import { OrderPaymentDetails } from "@/modules/billing/components/OrderPaymentDetails";
import type { Order, OrderAddition, OrderItem } from "../types";
import {
  formatAmount,
  formatDateTime,
  formatOrderId,
  getOrderTotal,
} from "../utils/order.helpers";
import { OrderActionButton } from "./OrderActionButton";

type OrdersSectionProps = {
  orders: Order[];
  onApproveOrder: (orderId: string) => void;
  onRejectOrder: (orderId: string) => void;
  onCloseOrder: (orderId: string) => void;
};

export function OrdersSection({
  orders,
  onApproveOrder,
  onRejectOrder,
  onCloseOrder,
}: OrdersSectionProps) {
  const pendingOrders = useMemo(
    () =>
      [...orders]
        .filter(
          (order) =>
            order.status === "pending" ||
            (order.status === "approved" && order.pendingAddition?.status === "pending"),
        )
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
    [orders],
  );

  const approvedOrders = useMemo(
    () =>
      [...orders]
        .filter(
          (order) =>
            order.status === "approved" && order.pendingAddition?.status !== "pending",
        )
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
    [orders],
  );

  const completedOrders = useMemo(
    () =>
      [...orders]
        .filter((order) => order.status === "completed")
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
    [orders],
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Orders</h2>
        <p className="mt-1 text-sm font-light text-zinc-500">
          Review, approve, and close customer orders.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-zinc-200">
      <OrdersGroup title="Pending" count={pendingOrders.length} emptyMessage="No pending orders">
        {pendingOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onApproveOrder={onApproveOrder}
            onRejectOrder={onRejectOrder}
            onCloseOrder={onCloseOrder}
          />
        ))}
      </OrdersGroup>

      <OrdersGroup title="Approved" count={approvedOrders.length} emptyMessage="No approved orders">
        {approvedOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onApproveOrder={onApproveOrder}
            onRejectOrder={onRejectOrder}
            onCloseOrder={onCloseOrder}
          />
        ))}
      </OrdersGroup>

      <OrdersGroup title="Completed" count={completedOrders.length} emptyMessage="No completed orders">
        {completedOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onApproveOrder={onApproveOrder}
            onRejectOrder={onRejectOrder}
            onCloseOrder={onCloseOrder}
          />
        ))}
      </OrdersGroup>
      </div>
    </div>
  );
}

function OrdersGroup({
  title,
  count,
  emptyMessage,
  children,
}: {
  title: string;
  count: number;
  emptyMessage: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 lg:px-5 first:lg:pl-0 last:lg:pr-0">
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <span className="text-base text-zinc-400">{count}</span>
      </div>
      {count > 0 ? (
        <ul className="space-y-5">{children}</ul>
      ) : (
        <div className="rounded-2xl border border-zinc-200 px-6 py-10 text-center text-base text-zinc-500">
          {emptyMessage}
        </div>
      )}
    </section>
  );
}

function OrderCard({
  order,
  onApproveOrder,
  onRejectOrder,
  onCloseOrder,
}: {
  order: Order;
  onApproveOrder: (orderId: string) => void;
  onRejectOrder: (orderId: string) => void;
  onCloseOrder: (orderId: string) => void;
}) {
  const showUpdated = order.updatedAt.getTime() > order.createdAt.getTime() + 1000;
  const hasPendingAddition = order.pendingAddition?.status === "pending";

  return (
    <li className="overflow-hidden rounded-2xl border border-zinc-200">
      <div className="border-b border-zinc-100 bg-zinc-50 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-black">
              {order.tableLabel}{" "}
              <span className="text-base font-normal text-zinc-500">
                {formatOrderId(order.id)}
              </span>
            </p>
            <div className="mt-1.5 space-y-0.5 text-sm text-zinc-500">
              <p>Created {formatDateTime(order.createdAt)}</p>
              {showUpdated && <p>Updated {formatDateTime(order.updatedAt)}</p>}
            </div>
          </div>
          {order.status === "completed" && (
            <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              Completed
            </span>
          )}
          {order.status === "approved" && !hasPendingAddition && (
            <span className="shrink-0 rounded-full bg-zinc-200 px-3 py-1 text-sm font-medium text-black">
              Approved
            </span>
          )}
          {(order.status === "pending" || hasPendingAddition) && (
            <span className="shrink-0 rounded-full bg-black px-3 py-1 text-sm font-medium text-white">
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
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-zinc-400">
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
          <div className="mt-5 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500">
              New items · {formatDateTime(order.pendingAddition.createdAt)}
            </p>
            <ItemList items={order.pendingAddition.items} />
            <p className="mt-2.5 text-base font-medium text-black">
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
    <ul className="space-y-1.5 text-base text-zinc-700">
      {items.map((item) => (
        <li key={`${item.menuItemId}-${item.name}`}>
          {item.quantity}× {item.name}
        </li>
      ))}
    </ul>
  );
}

function RejectedAddition({ addition }: { addition: OrderAddition }) {
  return (
    <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 opacity-70">
      <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-zinc-400 line-through">
        Rejected · {formatDateTime(addition.createdAt)}
      </p>
      <ul className="space-y-1.5 text-base text-zinc-500">
        {addition.items.map((item) => (
          <li key={`${item.menuItemId}-${item.name}`} className="line-through">
            {item.quantity}× {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
