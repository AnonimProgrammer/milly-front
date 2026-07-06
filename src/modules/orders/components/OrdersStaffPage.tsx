"use client";

import { useCallback, useEffect, useState } from "react";
import { useStaffVenueWs } from "@/modules/shared/ws";
import { useVenueMembership } from "@/modules/venue/context/VenueMembershipContext";
import { LoadFailedMessage } from "@/modules/staff/components/LoadFailedMessage";
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

  const loadOrders = useCallback(async (options?: { silent?: boolean }) => {
    const silent = options?.silent ?? false;

    if (!silent) {
      setLoadFailed(false);
      setIsLoading(true);
    }

    try {
      const orderResponses = await listOrders(venueId);

      let nextMenuItems: MenuItem[] = [];
      let nextTables: VenueTable[] = [];

      if (isManager) {
        const [menuResponses, tableResponses] = await Promise.all([
          listMenuItems(venueId),
          listTables(venueId),
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
      if (!silent) {
        setLoadFailed(true);
      }
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, [venueId, isManager]);

  useStaffVenueWs(venueId, () => {
    void loadOrders({ silent: true });
  });

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

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
    return null;
  }

  if (loadFailed) {
    return <LoadFailedMessage onRetry={() => void loadOrders()} />;
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
