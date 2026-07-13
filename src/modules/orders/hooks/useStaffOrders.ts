"use client";

import { useCallback, useRef, useState } from "react";
import { useStaffVenueWs } from "@/modules/staff";
import { canManageVenue, useVenueMembership } from "@/modules/venue";
import type { Order } from "../types";
import { getTodayOrderDate } from "../utils/order.helpers";
import {
  emptySupportingData,
  fetchMappedStaffOrders,
  type StaffOrdersSupportingData,
} from "./staffOrdersData";
import { useStaffOrderActions } from "./useStaffOrderActions";
import { useStaffOrdersLoader } from "./useStaffOrdersLoader";

export function useStaffOrders(venueId: string) {
  const membership = useVenueMembership();
  const isManager = canManageVenue(membership.role);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedDate, setSelectedDate] = useState(getTodayOrderDate);
  const supportingDataRef = useRef<StaffOrdersSupportingData>(emptySupportingData);

  const { isLoading, isRefreshingOrders, loadFailed, retry } = useStaffOrdersLoader({
    venueId,
    isManager,
    selectedDate,
    supportingDataRef,
    setOrders,
  });

  const { handleApproveOrder, handleRejectOrder, handleCloseOrder } = useStaffOrderActions(
    venueId,
    supportingDataRef,
    setOrders,
  );

  const refreshOrdersFromWs = useCallback(async () => {
    try {
      const nextOrders = await fetchMappedStaffOrders(
        venueId,
        selectedDate,
        supportingDataRef.current,
        { background: true },
      );
      setOrders(nextOrders);
    } catch {
      // Keep current UI when a background refresh fails.
    }
  }, [venueId, selectedDate]);

  useStaffVenueWs(venueId, () => {
    void refreshOrdersFromWs();
  });

  return {
    orders,
    selectedDate,
    setSelectedDate,
    isLoading,
    isRefreshingOrders,
    loadFailed,
    retry,
    handleApproveOrder,
    handleRejectOrder,
    handleCloseOrder,
  };
}
