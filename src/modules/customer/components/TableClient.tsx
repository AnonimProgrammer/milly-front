"use client";

import { ServiceUnavailable } from "@/modules/shared/ui";
import { useTableClientState } from "../hooks/useTableClientState";
import { BillView } from "./BillView";
import { MenuView } from "./MenuView";
import { OrderPendingView } from "./OrderPendingView";

type TableClientProps = {
  tableId: string;
};

export function TableClient({ tableId }: TableClientProps) {
  const {
    state,
    loading,
    error,
    forceMenu,
    setForceMenu,
    activeOrder,
    loadTableData,
    handlePlaceOrder,
  } = useTableClientState(tableId);

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
        code="404"
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
