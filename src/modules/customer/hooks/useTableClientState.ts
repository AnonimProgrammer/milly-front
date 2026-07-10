"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { MenuItem } from "@/modules/menu";
import type { Order } from "@/modules/orders";
import {
  addPublicOrderItems,
  createPublicOrder,
  getPublicTable,
  listPublicMenuItems,
  listPublicOrders,
  mapPublicMenuItem,
  mapPublicOrder,
  mapPublicOrders,
  toMenuLookup,
} from "../api";
import { useCustomerTableWs } from "../ws";
import { selectActiveOrderForTable } from "../utils/selectActiveOrder";

type TableState = {
  tableLabel: string;
  menuItems: MenuItem[];
  orders: Order[];
};

export function useTableClientState(tableId: string) {
  const [state, setState] = useState<TableState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [forceMenu, setForceMenu] = useState(false);

  const loadTableData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const table = await getPublicTable(tableId, { background: true });
      const [menuResponse, ordersResponse] = await Promise.all([
        listPublicMenuItems(tableId, { background: true }),
        listPublicOrders(tableId, { background: true }),
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

  const refreshOrders = useCallback(async () => {
    try {
      const ordersResponse = await listPublicOrders(tableId, { background: true });
      setState((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          orders: mapPublicOrders(ordersResponse, prev.menuItems, prev.tableLabel),
        };
      });
    } catch {
      // Keep current UI when a background refresh fails.
    }
  }, [tableId]);

  useCustomerTableWs(tableId, () => {
    void refreshOrders();
  });

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

      const menuById = toMenuLookup(state.menuItems);

      if (activeOrder?.status === "approved") {
        const response = await addPublicOrderItems(tableId, activeOrder.id, { items });
        const updated = mapPublicOrder(response, menuById, state.tableLabel);
        if (updated) {
          upsertOrder(updated);
        }
        setForceMenu(false);
        return;
      }

      const response = await createPublicOrder(tableId, { items });
      const updated = mapPublicOrder(response, menuById, state.tableLabel);
      if (updated) {
        upsertOrder(updated);
      }
      setForceMenu(false);
    },
    [activeOrder, state, tableId, upsertOrder],
  );

  return {
    state,
    loading,
    error,
    forceMenu,
    setForceMenu,
    activeOrder,
    loadTableData,
    refreshOrders,
    handlePlaceOrder,
  };
}
