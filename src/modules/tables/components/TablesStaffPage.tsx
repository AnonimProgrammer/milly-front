"use client";

import { useCallback, useEffect, useState } from "react";
import { LoadFailedMessage, StaffPageLoading } from "@/modules/staff";
import {
  TablesSection,
  createTable,
  deactivateTable,
  generateTableQr,
  listTables,
  mapTableResponse,
  type VenueTable,
} from "@/modules/tables";

type TablesStaffPageProps = {
  venueId: string;
};

export function TablesStaffPage({ venueId }: TablesStaffPageProps) {
  const [tables, setTables] = useState<VenueTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [generatingQrTableId, setGeneratingQrTableId] = useState<string | null>(null);

  const loadTables = useCallback(async () => {
    setLoadFailed(false);
    setIsLoading(true);

    try {
      const tableResponses = await listTables(venueId, { background: true });
      setTables(tableResponses.map(mapTableResponse));
    } catch {
      setLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [venueId]);

  useEffect(() => {
    void loadTables();
  }, [loadTables]);

  const handleAddTable = async (label: string) => {
    try {
      const created = await createTable(venueId, { label });
      setTables((prev) =>
        [...prev, mapTableResponse(created)].sort((a, b) => {
          const numA = parseInt(a.label.replace(/\D/g, ""), 10);
          const numB = parseInt(b.label.replace(/\D/g, ""), 10);
          if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
          return a.label.localeCompare(b.label);
        }),
      );
    } catch {
      // Error toast is shown globally by the API client.
    }
  };

  const handleDeactivateTable = async (tableId: string) => {
    try {
      await deactivateTable(venueId, tableId);
      setTables((prev) =>
        prev.map((table) =>
          table.id === tableId ? { ...table, status: "inactive" } : table,
        ),
      );
    } catch {
      // Error toast is shown globally by the API client.
    }
  };

  const handleGenerateQr = async (tableId: string) => {
    setGeneratingQrTableId(tableId);

    try {
      const qr = await generateTableQr(venueId, tableId);
      setTables((prev) =>
        prev.map((table) =>
          table.id === tableId ? { ...table, qrImageUrl: qr.qrImageUrl } : table,
        ),
      );
    } catch {
      // Error toast is shown globally by the API client.
    } finally {
      setGeneratingQrTableId(null);
    }
  };

  if (isLoading) {
    return <StaffPageLoading />;
  }

  if (loadFailed) {
    return <LoadFailedMessage onRetry={() => void loadTables()} />;
  }

  return (
    <TablesSection
      tables={tables}
      generatingQrTableId={generatingQrTableId}
      onAddTable={(label) => void handleAddTable(label)}
      onDeactivateTable={(tableId) => void handleDeactivateTable(tableId)}
      onGenerateQr={(tableId) => void handleGenerateQr(tableId)}
    />
  );
}
