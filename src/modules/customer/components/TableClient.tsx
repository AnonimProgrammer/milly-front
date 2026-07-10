"use client";

import { ChatbotIconButton } from "@/modules/chatbot";
import { BrandBackNav, MillyBrand, PageHeader, ServiceUnavailable } from "@/modules/shared/ui";
import { useTableClientState } from "../hooks/useTableClientState";
import { BillView } from "./BillView";
import { MenuView } from "./MenuView";
import { OrderPendingView } from "./OrderPendingView";

type TableClientProps = {
  tableId: string;
};

function CustomerTableHeader({
  tableId,
  onBack,
}: {
  tableId: string;
  onBack?: () => void;
}) {
  return (
    <PageHeader
      leading={onBack ? <BrandBackNav onClick={onBack} /> : <MillyBrand />}
      trailing={<ChatbotIconButton tableId={tableId} />}
    />
  );
}

export function TableClient({ tableId }: TableClientProps) {
  const {
    state,
    loading,
    error,
    forceMenu,
    setForceMenu,
    activeOrder,
    loadTableData,
    refreshOrders,
    handlePlaceOrder,
  } = useTableClientState(tableId);

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black font-sans antialiased p-6">
        <CustomerTableHeader tableId={tableId} />
        <div className="relative z-10 mx-auto w-full flex-1 py-4">
          <div className="mx-auto flex min-h-full w-full max-w-lg items-center justify-center bg-white py-24">
            <div className="h-10 w-10 animate-pulse rounded-full border-2 border-neutral-300 border-t-black" />
          </div>
        </div>
      </main>
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

  if (activeOrder?.status === "approved" && !forceMenu) {
    return (
      <main className="min-h-screen bg-white text-black font-sans antialiased p-6">
        <CustomerTableHeader tableId={tableId} />
        <div className="relative z-10 mx-auto w-full flex-1 py-4">
          <BillView
            tableLabel={state.tableLabel}
            order={activeOrder}
            onAddMore={() => setForceMenu(true)}
            onPaymentProcessed={refreshOrders}
          />
        </div>
      </main>
    );
  }

  if (activeOrder?.status === "pending" && !forceMenu) {
    return (
      <main className="min-h-screen bg-white text-black font-sans antialiased p-6">
        <CustomerTableHeader tableId={tableId} />
        <div className="relative z-10 mx-auto w-full flex-1 py-4">
          <OrderPendingView order={activeOrder} tableLabel={state.tableLabel} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black font-sans antialiased p-6">
      <CustomerTableHeader
        tableId={tableId}
        onBack={activeOrder?.status === "approved" ? () => setForceMenu(false) : undefined}
      />
      <div className="relative z-10 mx-auto w-full flex-1 py-4">
        <MenuView
          tableLabel={state.tableLabel}
          menuItems={state.menuItems}
          activeOrder={activeOrder}
          onPlaceOrder={handlePlaceOrder}
          onOrderPlaced={() => setForceMenu(false)}
        />
      </div>
    </main>
  );
}
