"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ServiceUnavailable } from "@/modules/shared/ui";
import type { MenuItem } from "@/modules/menu/types";
import type { Order } from "@/modules/orders/types";
import {
  addPublicOrderItems,
  createPublicOrder,
  getPublicTable,
  listPublicMenuItems,
  listPublicOrders,
  mapPublicMenuItem,
  mapPublicOrder,
  mapPublicOrders,
} from "../api";
import { selectActiveOrderForTable } from "../utils/selectActiveOrder";
import { BillView } from "./BillView";
import { MenuView } from "./MenuView";
import { OrderPendingView } from "./OrderPendingView";

type TableClientProps = {
  tableId: string;
};

type TableState = {
  tableLabel: string;
  menuItems: MenuItem[];
  orders: Order[];
};

export function TableClient({ tableId }: TableClientProps) {
  const [state, setState] = useState<TableState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [forceMenu, setForceMenu] = useState(false);

  const loadTableData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const table = await getPublicTable(tableId);
      const [menuResponse, ordersResponse] = await Promise.all([
        listPublicMenuItems(tableId),
        listPublicOrders(tableId),
      ]);

      const menuItems = menuResponse.map(mapPublicMenuItem);
      const orders = mapPublicOrders(ordersResponse, menuItems, table.label);

      setState({
        tableLabel: table.label,
        menuItems,
        orders,
      });
    } catch {
      setState(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [tableId]);

  useEffect(() => {
    void loadTableData();
  }, [loadTableData]);

  const activeOrder = useMemo(
    () => (state ? selectActiveOrderForTable(state.orders, tableId) : null),
    [state, tableId],
  );

  const upsertOrder = useCallback((updatedOrder: Order) => {
    setState((prev) => {
      if (!prev) return prev;

      const existingIndex = prev.orders.findIndex((order) => order.id === updatedOrder.id);
      const orders =
        existingIndex >= 0
          ? prev.orders.map((order, index) => (index === existingIndex ? updatedOrder : order))
          : [updatedOrder, ...prev.orders];

      return { ...prev, orders };
    });
  }, []);

  const handlePlaceOrder = useCallback(
    async (items: { menuItemId: string; quantity: number }[]) => {
      if (!state) return;

      if (activeOrder?.status === "approved") {
        const response = await addPublicOrderItems(tableId, activeOrder.id, { items });
        const updated = mapPublicOrder(response, new Map(state.menuItems.map((item) => [item.id, item])), state.tableLabel);
        if (updated) {
          upsertOrder(updated);
        }
        setForceMenu(false);
        return;
      }

      const response = await createPublicOrder(tableId, { items });
      const updated = mapPublicOrder(response, new Map(state.menuItems.map((item) => [item.id, item])), state.tableLabel);
      if (updated) {
        upsertOrder(updated);
      }
      setForceMenu(false);
    },
    [activeOrder, state, tableId, upsertOrder],
  );

  if (loading) {
    return (
      <div className="mx-auto flex min-h-full w-full max-w-lg items-center justify-center bg-white py-24">
        <div className="h-10 w-10 animate-pulse rounded-full border-2 border-neutral-300 border-t-black" />
      </div>
    );
  }

  if (error || !state) {
    return (
      <ServiceUnavailable
        fullPage
        title="Table not found"
        message="This table is unavailable or the link may be invalid."
        onRetry={() => void loadTableData()}
      />
    );
  }

  if (activeOrder?.status === "pending" && !forceMenu) {
    return <OrderPendingView order={activeOrder} tableLabel={state.tableLabel} />;
  }

  if (activeOrder?.status === "approved" && !forceMenu) {
    return (
      <BillView
        tableLabel={state.tableLabel}
        order={activeOrder}
        onAddMore={() => setForceMenu(true)}
      />
    );
  }

  return (
    <MenuView
      tableLabel={state.tableLabel}
      menuItems={state.menuItems}
      activeOrder={activeOrder}
      onPlaceOrder={handlePlaceOrder}
      onOrderPlaced={() => setForceMenu(false)}
    />
  );
}
