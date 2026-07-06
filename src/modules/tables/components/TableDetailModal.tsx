"use client";

import Link from "next/link";
import { useEffect } from "react";
import { showToast } from "@/modules/shared/feedback";
import type { VenueTable } from "../types";

type TableDetailModalProps = {
  table: VenueTable;
  isGeneratingQr: boolean;
  onClose: () => void;
  onGenerateQr: (tableId: string) => void;
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
  isGeneratingQr,
  onClose,
  onGenerateQr,
  onDeactivate,
}: TableDetailModalProps) {
  const customerUrl = `/table/${table.id}`;
  const hasQr = Boolean(table.qrImageUrl);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleExportQr() {
    showToast("Export QR coming soon.", "success");
  }

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
          <div className="flex h-[180px] w-[180px] items-center justify-center rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
            {hasQr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={table.qrImageUrl!}
                alt={`QR code for ${table.label}`}
                width={180}
                height={180}
                className="h-full w-full object-contain"
              />
            ) : (
              <p className="px-2 text-center text-sm font-light text-zinc-400">
                Generated QR will be displayed here
              </p>
            )}
          </div>

          <Link
            href={customerUrl}
            className="break-all text-center font-mono text-xs text-zinc-500 underline-offset-2 hover:text-black hover:underline"
          >
            {customerUrl}
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {hasQr ? (
            <button
              type="button"
              onClick={handleExportQr}
              className="w-full cursor-pointer rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Export QR
            </button>
          ) : (
            table.status === "active" && (
              <button
                type="button"
                onClick={() => onGenerateQr(table.id)}
                disabled={isGeneratingQr}
                className="w-full cursor-pointer rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
              >
                {isGeneratingQr ? "Generating..." : "Generate QR"}
              </button>
            )
          )}
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
