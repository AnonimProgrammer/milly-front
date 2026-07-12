"use client";

import { LoadFailedMessage, StaffPageLoading } from "@/modules/staff";
import { useStaffOrders } from "../hooks/useStaffOrders";
import { OrdersSection } from "./OrdersSection";

type OrdersStaffPageProps = {
  venueId: string;
};

export function OrdersStaffPage({ venueId }: OrdersStaffPageProps) {
  const {
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
  } = useStaffOrders(venueId);

  if (isLoading) {
    return <StaffPageLoading />;
  }

  if (loadFailed) {
    return <LoadFailedMessage onRetry={retry} />;
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
