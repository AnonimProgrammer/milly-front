"use client";

import { useMemo } from "react";
import type { Order } from "../types";
import { getTodayOrderDate } from "../utils/order.helpers";
import { OrderCard } from "./OrderCard";
import { OrdersGroup } from "./OrdersGroup";

type OrdersSectionProps = {
  orders: Order[];
  selectedDate: string;
  onSelectedDateChange: (date: string) => void;
  isRefreshing?: boolean;
  onApproveOrder: (orderId: string) => void;
  onRejectOrder: (orderId: string) => void;
  onCloseOrder: (orderId: string) => void;
};

export function OrdersSection({
  orders,
  selectedDate,
  onSelectedDateChange,
  isRefreshing = false,
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Orders</h2>
          <p className="mt-1 text-sm font-light text-zinc-500">
            Review, approve, and close customer orders.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 sm:items-end">
          <label htmlFor="orders-date" className="text-xs font-semibold uppercase text-zinc-500">
            Date
          </label>
          <input
            id="orders-date"
            type="date"
            value={selectedDate}
            max={getTodayOrderDate()}
            disabled={isRefreshing}
            onChange={(event) => onSelectedDateChange(event.target.value)}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm text-black dark:text-zinc-100 outline-none transition-all focus:border-black dark:focus:border-zinc-400 disabled:cursor-wait disabled:opacity-60"
          />
        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-10 transition-opacity lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-zinc-200 dark:lg:divide-zinc-700 ${isRefreshing ? "opacity-60" : ""}`}
      >
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
