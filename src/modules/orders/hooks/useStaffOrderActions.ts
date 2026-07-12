"use client";

import { useCallback, type Dispatch, type RefObject, type SetStateAction } from "react";
import { approveOrder, closeOrder, rejectOrder } from "../api/orderApi";
import { mapStaffOrderResponse } from "../api/mappers";
import type { Order } from "../types";
import {
  toStaffOrderLookups,
  type StaffOrdersSupportingData,
} from "./staffOrdersData";

export function useStaffOrderActions(
  venueId: string,
  supportingDataRef: RefObject<StaffOrdersSupportingData>,
  setOrders: Dispatch<SetStateAction<Order[]>>,
) {
  const handleApproveOrder = useCallback(
    async (orderId: string) => {
      try {
        const updated = await approveOrder(venueId, orderId);
        const { menuById, tableById } = toStaffOrderLookups(supportingDataRef.current);
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
    },
    [venueId, supportingDataRef, setOrders],
  );

  const handleRejectOrder = useCallback(
    async (orderId: string) => {
      try {
        await rejectOrder(venueId, orderId);
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
      } catch {
        // Error toast is shown globally by the API client.
      }
    },
    [venueId, setOrders],
  );

  const handleCloseOrder = useCallback(
    async (orderId: string) => {
      try {
        const updated = await closeOrder(venueId, orderId);
        const { menuById, tableById } = toStaffOrderLookups(supportingDataRef.current);
        const mapped = mapStaffOrderResponse(updated, menuById, tableById);

        if (mapped) {
          setOrders((prev) => prev.map((order) => (order.id === orderId ? mapped : order)));
        }
      } catch {
        // Error toast is shown globally by the API client.
      }
    },
    [venueId, supportingDataRef, setOrders],
  );

  return {
    handleApproveOrder,
    handleRejectOrder,
    handleCloseOrder,
  };
}
