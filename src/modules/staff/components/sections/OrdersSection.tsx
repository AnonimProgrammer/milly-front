"use client";

import { Order, OrderStatus } from "../StaffPortalPage";

type OrdersSectionProps = {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
};

export function OrdersSection({
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
}: OrdersSectionProps) {
  // Helper to filter orders by status
  const getOrdersByStatus = (status: OrderStatus) => {
    return orders.filter((order) => order.status === status);
  };

  const columns: { id: OrderStatus; label: string; actionLabel: string; nextStatus: OrderStatus | null }[] = [
    { id: "pending", label: "Pending", actionLabel: "Approve", nextStatus: "approved" },
    { id: "approved", label: "Approved", actionLabel: "Complete", nextStatus: "completed" },
    { id: "completed", label: "Completed", actionLabel: "Archive", nextStatus: null },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Orders</h2>
        <p className="text-sm text-zinc-500 font-light mt-1">
          Manage real-time guest orders and statuses.
        </p>
      </div>

      {/* Grid columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((column) => {
          const colOrders = getOrdersByStatus(column.id);

          return (
            <div key={column.id} className="flex flex-col gap-4">
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <span className="font-semibold text-sm text-zinc-900">
                  {column.label}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-500 font-medium">
                  {colOrders.length}
                </span>
              </div>

              {/* Order Cards list */}
              <div className="flex flex-col gap-3 min-h-[300px]">
                {colOrders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center border border-dashed border-zinc-200 rounded-2xl py-12 px-4 bg-zinc-50/50">
                    <p className="text-xs text-zinc-400 text-center font-light">
                      No {column.label.toLowerCase()} orders
                    </p>
                  </div>
                ) : (
                  colOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm hover:border-black transition-all flex flex-col justify-between"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-sm text-black">
                          {order.table}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-light">
                          {order.id}
                        </span>
                      </div>

                      {/* Items List */}
                      <div className="my-3 flex flex-col gap-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-xs text-zinc-600 font-light">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Price & Actions */}
                      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                        <span className="font-bold text-sm text-black">
                          {order.total.toFixed(2)} ₼
                        </span>

                        {column.nextStatus ? (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, column.nextStatus!)}
                            className="px-3.5 py-1.5 text-[11px] font-medium bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                          >
                            {column.actionLabel}
                          </button>
                        ) : (
                          <button
                            onClick={() => onDeleteOrder(order.id)}
                            className="px-3.5 py-1.5 text-[11px] font-medium border border-zinc-200 hover:border-black text-zinc-500 hover:text-black rounded-lg transition-all cursor-pointer"
                          >
                            {column.actionLabel}
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
