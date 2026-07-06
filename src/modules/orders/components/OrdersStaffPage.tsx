"use client";

import { useCallback, useEffect, useState } from "react";
import { useStaffVenueWs } from "@/modules/staff";
import { useVenueMembership } from "@/modules/venue";
import { LoadFailedMessage, StaffPageLoading } from "@/modules/staff";
import { listMenuItems, mapMenuItemResponse, type MenuItem } from "@/modules/menu";
import { listTables, mapTableResponse, type VenueTable } from "@/modules/tables";
import {
  OrdersSection,
  approveOrder,
  closeOrder,
  listOrders,
  mapStaffOrderResponse,
  mapStaffOrders,
  rejectOrder,
  type Order,
} from "@/modules/orders";

type OrdersStaffPageProps = {
  venueId: string;
};

export function OrdersStaffPage({ venueId }: OrdersStaffPageProps) {
  const membership = useVenueMembership();
  const isManager = membership.role === "MANAGER";
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tables, setTables] = useState<VenueTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadPageData = useCallback(async () => {
    setLoadFailed(false);
    setIsLoading(true);

    try {
      const orderResponses = await listOrders(venueId, { background: true });

      let nextMenuItems: MenuItem[] = [];
      let nextTables: VenueTable[] = [];

      if (isManager) {
        const [menuResponses, tableResponses] = await Promise.all([
          listMenuItems(venueId, { background: true }),
          listTables(venueId, { background: true }),
        ]);
        nextMenuItems = menuResponses.map(mapMenuItemResponse);
        nextTables = tableResponses.map(mapTableResponse);
      }

      setMenuItems(nextMenuItems);
      setTables(nextTables);

      const menuById = new Map(nextMenuItems.map((item) => [item.id, item]));
      const tableById = new Map(nextTables.map((table) => [table.id, table]));

      setOrders(mapStaffOrders(orderResponses, menuById, tableById));
    } catch {
      setLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [venueId, isManager]);

  const refreshOrdersFromWs = useCallback(async () => {
    try {
      const orderResponses = await listOrders(venueId, { background: true });
      const menuById = new Map(menuItems.map((item) => [item.id, item]));
      const tableById = new Map(tables.map((table) => [table.id, table]));
      setOrders(mapStaffOrders(orderResponses, menuById, tableById));
    } catch {
      // Keep current UI when a background refresh fails.
    }
  }, [venueId, menuItems, tables]);

  useStaffVenueWs(venueId, () => {
    void refreshOrdersFromWs();
  });

  useEffect(() => {
    void loadPageData();
  }, [loadPageData]);

  const getLookups = useCallback(() => {
    const menuById = new Map(menuItems.map((item) => [item.id, item]));
    const tableById = new Map(tables.map((table) => [table.id, table]));
    return { menuById, tableById };
  }, [menuItems, tables]);

  const handleApproveOrder = async (orderId: string) => {
    try {
      const updated = await approveOrder(venueId, orderId);
      const { menuById, tableById } = getLookups();
      const mapped = mapStaffOrderResponse(updated, menuById, tableById);

      setOrders((prev) => {
        if (!mapped) {
          return prev.filter((order) => order.id !== orderId);
        }
        return prev.map((order) => (order.id === orderId ? mapped : order));
      });
    } catch {
      // Error toast is shown globally by the API client.
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    try {
      await rejectOrder(venueId, orderId);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch {
      // Error toast is shown globally by the API client.
    }
  };

  const handleCloseOrder = async (orderId: string) => {
    try {
      const updated = await closeOrder(venueId, orderId);
      const { menuById, tableById } = getLookups();
      const mapped = mapStaffOrderResponse(updated, menuById, tableById);

      if (mapped) {
        setOrders((prev) => prev.map((order) => (order.id === orderId ? mapped : order)));
      }
    } catch {
      // Error toast is shown globally by the API client.
    }
  };

  if (isLoading) {
    return <StaffPageLoading />;
  }

  if (loadFailed) {
    return <LoadFailedMessage onRetry={() => void loadPageData()} />;
  }

  return (
    <OrdersSection
      orders={orders}
      onApproveOrder={(orderId) => void handleApproveOrder(orderId)}
      onRejectOrder={(orderId) => void handleRejectOrder(orderId)}
      onCloseOrder={(orderId) => void handleCloseOrder(orderId)}
    />
  );
}
