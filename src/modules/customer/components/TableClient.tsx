"use client";

import { ChatbotIconButton } from "@/modules/chatbot";
import { SettingsMenuButton } from "@/modules/auth";
import { pageShell, spinnerRing } from "@/modules/shared/theme/classNames";
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
      trailing={
        <div className="flex items-center gap-2 overflow-visible">
          <ChatbotIconButton tableId={tableId} />
          <SettingsMenuButton />
        </div>
      }
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
      <main className={`min-h-screen bg-transparent p-6 ${pageShell}`}>
        <CustomerTableHeader tableId={tableId} />
        <div className="relative mx-auto w-full flex-1 py-4">
          <div className="mx-auto flex min-h-full w-full max-w-lg items-center justify-center bg-card py-24">
            <div className={`h-10 w-10 ${spinnerRing}`} />
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
      <main className={`min-h-screen bg-transparent p-6 ${pageShell}`}>
        <CustomerTableHeader tableId={tableId} />
        <div className="relative mx-auto w-full flex-1 py-4">
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
      <main className={`min-h-screen bg-transparent p-6 ${pageShell}`}>
        <CustomerTableHeader tableId={tableId} />
        <div className="relative mx-auto w-full flex-1 py-4">
          <OrderPendingView order={activeOrder} tableLabel={state.tableLabel} />
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen bg-transparent p-6 ${pageShell}`}>
      <CustomerTableHeader
        tableId={tableId}
        onBack={activeOrder?.status === "approved" ? () => setForceMenu(false) : undefined}
      />
      <div className="relative mx-auto w-full flex-1 py-4">
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
