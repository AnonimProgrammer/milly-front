"use client";

import { useState } from "react";
import { showErrorToast } from "@/modules/shared/feedback";
import { inputField, listRow, primaryButton, textMuted } from "@/modules/shared/theme/classNames";
import type { VenueTable } from "../types";
import { TableDetailModal } from "./TableDetailModal";
import { TableStatusBadge } from "./TableStatusBadge";

type TablesSectionProps = {
  tables: VenueTable[];
  onAddTable: (label: string) => void;
  onUpdateTableLabel: (tableId: string, label: string) => void;
  onDeactivateTable: (tableId: string) => void;
  onActivateTable: (tableId: string) => void;
  onGenerateQr: (tableId: string) => void;
  generatingQrTableId: string | null;
  savingLabelTableId: string | null;
  togglingStatusTableId: string | null;
};

export function TablesSection({
  tables,
  onAddTable,
  onUpdateTableLabel,
  onDeactivateTable,
  onActivateTable,
  onGenerateQr,
  generatingQrTableId,
  savingLabelTableId,
  togglingStatusTableId,
}: TablesSectionProps) {
  const [newTable, setNewTable] = useState("");
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  const selectedTable = tables.find((table) => table.id === selectedTableId) ?? null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTable.trim()) return;

    const formatted = newTable.toLowerCase().startsWith("table")
      ? newTable.trim()
      : `Table ${newTable.trim()}`;

    if (tables.some((table) => table.label === formatted)) {
      showErrorToast("This table already exists!");
      return;
    }

    onAddTable(formatted);
    setNewTable("");
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Tables</h2>
          <p className={`mt-1 text-sm font-light ${textMuted}`}>
            Manage restaurant tables and their QR codes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={newTable}
            onChange={(e) => setNewTable(e.target.value)}
            placeholder="Table number (e.g. 9)"
            className={`flex-1 ${inputField}`}
            required
          />
          <button
            type="submit"
            className={`cursor-pointer rounded-xl px-6 py-3 text-sm font-medium ${primaryButton}`}
          >
            Add
          </button>
        </form>

        {tables.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
            <p className={`text-sm font-light ${textMuted}`}>No tables configured.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tables.map((table) => (
              <button
                key={table.id}
                type="button"
                onClick={() => setSelectedTableId(table.id)}
                className={`flex cursor-pointer items-center justify-between px-5 py-4 text-left hover:shadow-sm ${listRow}`}
              >
                <span className="text-sm font-semibold text-foreground">{table.label}</span>
                <TableStatusBadge status={table.status} />
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedTable && (
        <TableDetailModal
          key={selectedTable.id}
          table={selectedTable}
          busy={{
            savingLabel: savingLabelTableId === selectedTable.id,
            generatingQr: generatingQrTableId === selectedTable.id,
            togglingStatus: togglingStatusTableId === selectedTable.id,
          }}
          onClose={() => setSelectedTableId(null)}
          onUpdateLabel={(label) => {
            if (tables.some((table) => table.id !== selectedTable.id && table.label === label)) {
              showErrorToast("This table already exists!");
              return;
            }
            onUpdateTableLabel(selectedTable.id, label);
          }}
          onGenerateQr={() => onGenerateQr(selectedTable.id)}
          onActivate={() => onActivateTable(selectedTable.id)}
          onDeactivate={() => onDeactivateTable(selectedTable.id)}
        />
      )}
    </>
  );
}
