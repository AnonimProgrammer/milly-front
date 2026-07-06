"use client";

import { useMemo } from "react";
import type { Order } from "../types";
import { OrderCard } from "./OrderCard";
import { OrdersGroup } from "./OrdersGroup";

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
