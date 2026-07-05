"use client";

import { useState } from "react";
import type { VenueTable } from "../types";
import { TableDetailModal } from "./TableDetailModal";

type TablesSectionProps = {
  tables: VenueTable[];
  onAddTable: (label: string) => void;
  onDeactivateTable: (tableId: string) => void;
  onGenerateQr: (tableId: string) => void;
  generatingQrTableId: string | null;
};

function TableStatusBadge({ status }: { status: VenueTable["status"] }) {
  if (status === "active") {
    return (
      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        Active
      </span>
    );
  }

  return (
    <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500">
      Inactive
    </span>
  );
}

export function TablesSection({
  tables,
  onAddTable,
  onDeactivateTable,
  onGenerateQr,
  generatingQrTableId,
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
      alert("This table already exists!");
      return;
    }

    onAddTable(formatted);
    setNewTable("");
  };

  const handleDeactivate = (tableId: string) => {
    onDeactivateTable(tableId);
    setSelectedTableId(null);
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Tables</h2>
          <p className="mt-1 text-sm font-light text-zinc-500">
            Manage restaurant tables and their QR codes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={newTable}
            onChange={(e) => setNewTable(e.target.value)}
            placeholder="Table number (e.g. 9)"
            className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-black outline-none transition-all focus:border-black"
            required
          />
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Add
          </button>
        </form>

        {tables.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 px-6 py-12 text-center">
            <p className="text-sm font-light text-zinc-400">No tables configured.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tables.map((table) => (
              <button
                key={table.id}
                type="button"
                onClick={() => setSelectedTableId(table.id)}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left transition-all hover:border-black hover:shadow-sm"
              >
                <span className="text-sm font-semibold text-black">{table.label}</span>
                <TableStatusBadge status={table.status} />
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedTable && (
        <TableDetailModal
          table={selectedTable}
          isGeneratingQr={generatingQrTableId === selectedTable.id}
          onClose={() => setSelectedTableId(null)}
          onGenerateQr={onGenerateQr}
          onDeactivate={handleDeactivate}
        />
      )}
    </>
  );
}
