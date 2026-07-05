"use client";

import { useEffect } from "react";
import type { VenueTable } from "../types";
import { TableQRCode } from "./TableQRCode";

type TableDetailModalProps = {
  table: VenueTable;
  onClose: () => void;
  onGenerateNewQR: (tableId: string) => void;
  onDeactivate: (tableId: string) => void;
};

function TableStatusBadge({ status }: { status: VenueTable["status"] }) {
  if (status === "active") {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
        Active
      </span>
    );
  }

  return (
    <span className="rounded-full bg-zinc-200 px-3 py-1 text-sm font-medium text-zinc-600">
      Inactive
    </span>
  );
}

export function TableDetailModal({
  table,
  onClose,
  onGenerateNewQR,
  onDeactivate,
}: TableDetailModalProps) {
  const customerUrl = `/table/${table.id}`;

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="table-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id="table-detail-title" className="text-xl font-bold text-black">
              {table.label}
            </h3>
            <p className="mt-1 font-mono text-xs text-zinc-400">{table.id}</p>
          </div>
          <TableStatusBadge status={table.status} />
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
            <TableQRCode size={180} />
          </div>
          <p className="break-all text-center font-mono text-xs text-zinc-400">{customerUrl}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onGenerateNewQR(table.id)}
            className="w-full cursor-pointer rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Generate new QR
          </button>
          {table.status === "active" && (
            <button
              type="button"
              onClick={() => onDeactivate(table.id)}
              className="w-full cursor-pointer rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:border-black hover:text-black"
            >
              Deactivate
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full cursor-pointer py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
}
