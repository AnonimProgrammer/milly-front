"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useStaffVenueWs } from "@/modules/staff";
import { useVenueMembership } from "@/modules/venue";
import { LoadFailedMessage, StaffPageLoading } from "@/modules/staff";
import { listMenuItems, mapMenuItemResponse, type MenuItem } from "@/modules/menu";
import { listTables, mapTableResponse, type VenueTable } from "@/modules/tables";
import {
  approveOrder,
  closeOrder,
  listAllOrders,
  rejectOrder,
} from "../api/orderApi";
import { mapStaffOrderResponse, mapStaffOrders } from "../api/mappers";
import type { Order } from "../types";
import { getTodayOrderDate, toOrderDateRange } from "../utils/order.helpers";
import { OrdersSection } from "./OrdersSection";

type OrdersStaffPageProps = {
  venueId: string;
};

type SupportingData = {
  menuItems: MenuItem[];
  tables: VenueTable[];
};

const emptySupportingData: SupportingData = {
  menuItems: [],
  tables: [],
};

function toLookups({ menuItems, tables }: SupportingData) {
  return {
    menuById: new Map(menuItems.map((item) => [item.id, item])),
    tableById: new Map(tables.map((table) => [table.id, table])),
  };
}

export function OrdersStaffPage({ venueId }: OrdersStaffPageProps) {
  const membership = useVenueMembership();
  const isManager = membership.role === "MANAGER";
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedDate, setSelectedDate] = useState(getTodayOrderDate);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshingOrders, setIsRefreshingOrders] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const supportingDataRef = useRef<SupportingData>(emptySupportingData);
  const hasLoadedOnce = useRef(false);

  const loadSupportingData = useCallback(async (): Promise<SupportingData> => {
    let menuItems: MenuItem[] = [];
    let tables: VenueTable[] = [];

    if (isManager) {
      const [menuResponses, tableResponses] = await Promise.all([
        listMenuItems(venueId, { background: true }),
        listTables(venueId, { background: true }),
      ]);
      menuItems = menuResponses.map(mapMenuItemResponse);
      tables = tableResponses.map(mapTableResponse);
    }

    const nextSupportingData = { menuItems, tables };
    supportingDataRef.current = nextSupportingData;
    return nextSupportingData;
  }, [venueId, isManager]);

  const fetchOrders = useCallback(
    async (
      date: string,
      data: SupportingData,
      options?: { background?: boolean },
    ) => {
      const { from, to } = toOrderDateRange(date);
      const { menuById, tableById } = toLookups(data);
      const orderResponses = await listAllOrders(
        venueId,
        { from, to },
        { background: options?.background },
      );
      return mapStaffOrders(orderResponses, menuById, tableById);
    },
    [venueId],
  );

  const refreshOrdersFromWs = useCallback(async () => {
    try {
      const nextOrders = await fetchOrders(selectedDate, supportingDataRef.current, {
        background: true,
      });
      setOrders(nextOrders);
    } catch {
      // Keep current UI when a background refresh fails.
    }
  }, [fetchOrders, selectedDate]);

  useStaffVenueWs(venueId, () => {
    void refreshOrdersFromWs();
  });

  useEffect(() => {
    hasLoadedOnce.current = false;
  }, [venueId]);

  useEffect(() => {
    let cancelled = false;
    const isInitialLoad = !hasLoadedOnce.current;

    if (isInitialLoad) {
      setIsLoading(true);
    } else {
      setIsRefreshingOrders(true);
    }

    setLoadFailed(false);

    void (async () => {
      try {
        const data = isInitialLoad
          ? await loadSupportingData()
          : supportingDataRef.current;
        const nextOrders = await fetchOrders(selectedDate, data, { background: true });

        if (cancelled) {
          return;
        }

        setOrders(nextOrders);
        hasLoadedOnce.current = true;
      } catch {
        if (!cancelled) {
          setLoadFailed(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setIsRefreshingOrders(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [venueId, isManager, selectedDate, retryCount, loadSupportingData, fetchOrders]);

  const handleApproveOrder = async (orderId: string) => {
    try {
      const updated = await approveOrder(venueId, orderId);
      const { menuById, tableById } = toLookups(supportingDataRef.current);
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
      const { menuById, tableById } = toLookups(supportingDataRef.current);
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
    return (
      <LoadFailedMessage
        onRetry={() => {
          hasLoadedOnce.current = false;
          setRetryCount((count) => count + 1);
        }}
      />
    );
  }

  return (
    <OrdersSection
      orders={orders}
      selectedDate={selectedDate}
      onSelectedDateChange={setSelectedDate}
      isRefreshing={isRefreshingOrders}
      onApproveOrder={(orderId) => void handleApproveOrder(orderId)}
      onRejectOrder={(orderId) => void handleRejectOrder(orderId)}
      onCloseOrder={(orderId) => void handleCloseOrder(orderId)}
    />
  );
}
