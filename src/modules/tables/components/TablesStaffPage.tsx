"use client";

import { useCallback, useEffect, useState } from "react";
import { LoadFailedMessage, StaffPageLoading } from "@/modules/staff";
import {
  activateTable,
  createTable,
  deactivateTable,
  generateTableQr,
  listTables,
  mapTableResponse,
  updateTableLabel,
} from "../api";
import type { VenueTable } from "../types";
import { TablesSection } from "./TablesSection";

type TablesStaffPageProps = {
  venueId: string;
};

function sortTables(tables: VenueTable[]): VenueTable[] {
  return [...tables].sort((a, b) => {
    const numA = parseInt(a.label.replace(/\D/g, ""), 10);
    const numB = parseInt(b.label.replace(/\D/g, ""), 10);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return a.label.localeCompare(b.label);
  });
}

export function TablesStaffPage({ venueId }: TablesStaffPageProps) {
  const [tables, setTables] = useState<VenueTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [generatingQrTableId, setGeneratingQrTableId] = useState<string | null>(null);
  const [savingLabelTableId, setSavingLabelTableId] = useState<string | null>(null);
  const [togglingStatusTableId, setTogglingStatusTableId] = useState<string | null>(null);

  const loadTables = useCallback(async () => {
    setLoadFailed(false);
    setIsLoading(true);

    try {
      const tableResponses = await listTables(venueId, { background: true });
      setTables(sortTables(tableResponses.map(mapTableResponse)));
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
      setTables((prev) => sortTables([...prev, mapTableResponse(created)]));
    } catch {
      // Error toast is shown globally by the API client.
    }
  };

  const handleUpdateTableLabel = async (tableId: string, label: string) => {
    setSavingLabelTableId(tableId);

    try {
      const updated = await updateTableLabel(venueId, tableId, { label });
      setTables((prev) =>
        sortTables(
          prev.map((table) => (table.id === tableId ? mapTableResponse(updated) : table)),
        ),
      );
    } catch {
      // Error toast is shown globally by the API client.
    } finally {
      setSavingLabelTableId(null);
    }
  };

  const handleDeactivateTable = async (tableId: string) => {
    setTogglingStatusTableId(tableId);

    try {
      await deactivateTable(venueId, tableId);
      setTables((prev) =>
        prev.map((table) =>
          table.id === tableId ? { ...table, status: "inactive" } : table,
        ),
      );
    } catch {
      // Error toast is shown globally by the API client.
    } finally {
      setTogglingStatusTableId(null);
    }
  };

  const handleActivateTable = async (tableId: string) => {
    setTogglingStatusTableId(tableId);

    try {
      await activateTable(venueId, tableId);
      setTables((prev) =>
        prev.map((table) =>
          table.id === tableId ? { ...table, status: "active" } : table,
        ),
      );
    } catch {
      // Error toast is shown globally by the API client.
    } finally {
      setTogglingStatusTableId(null);
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
      savingLabelTableId={savingLabelTableId}
      togglingStatusTableId={togglingStatusTableId}
      onAddTable={(label) => void handleAddTable(label)}
      onUpdateTableLabel={(tableId, label) => void handleUpdateTableLabel(tableId, label)}
      onDeactivateTable={(tableId) => void handleDeactivateTable(tableId)}
      onActivateTable={(tableId) => void handleActivateTable(tableId)}
      onGenerateQr={(tableId) => void handleGenerateQr(tableId)}
    />
  );
}
