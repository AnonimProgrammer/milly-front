"use client";

import { useCallback, useEffect, useState } from "react";
import { LoadFailedMessage } from "@/modules/staff/components/LoadFailedMessage";
import {
  TablesSection,
  createTable,
  deactivateTable,
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

  const loadTables = useCallback(async () => {
    setLoadFailed(false);
    setIsLoading(true);

    try {
      const tableResponses = await listTables(venueId);
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

  const handleGenerateNewQR = (tableId: string) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId
          ? { ...table, qrToken: `${table.id}-${Date.now()}` }
          : table,
      ),
    );
  };

  if (isLoading) {
    return null;
  }

  if (loadFailed) {
    return <LoadFailedMessage onRetry={() => void loadTables()} />;
  }

  return (
    <TablesSection
      tables={tables}
      onAddTable={(label) => void handleAddTable(label)}
      onDeactivateTable={(tableId) => void handleDeactivateTable(tableId)}
      onGenerateNewQR={handleGenerateNewQR}
    />
  );
}
