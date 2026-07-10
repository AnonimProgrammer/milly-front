"use client";

import Link from "next/link";
import { useEffect } from "react";
import { showToast } from "@/modules/shared/feedback";
import {
  modalOverlay,
  modalPanel,
  primaryButton,
  secondaryButton,
  surfaceCard,
  textMuted,
} from "@/modules/shared/theme/classNames";
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
      <span className="rounded-full bg-green-100 dark:bg-green-900/20 border border-green-200/80 dark:border-green-800/40 px-3 py-1 text-sm font-medium text-green-800 dark:text-green-400">
        Active
      </span>
    );
  }

  return (
    <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
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
    <div className={modalOverlay} onClick={onClose} role="presentation">
      <div
        className={modalPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="table-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id="table-detail-title" className="text-xl font-bold text-foreground">
              {table.label}
            </h3>
            <p className={`mt-1 font-mono text-xs ${textMuted}`}>{table.id}</p>
          </div>
          <TableStatusBadge status={table.status} />
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <div className={`flex h-[180px] w-[180px] items-center justify-center p-4 shadow-sm ${surfaceCard}`}>
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
              <p className={`px-2 text-center text-sm font-light ${textMuted}`}>
                Generated QR will be displayed here
              </p>
            )}
          </div>

          <Link
            href={customerUrl}
            className={`break-all text-center font-mono text-xs underline-offset-2 hover:text-foreground hover:underline ${textMuted}`}
          >
            {customerUrl}
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {hasQr ? (
            <button
              type="button"
              onClick={handleExportQr}
              className={`w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-medium ${primaryButton}`}
            >
              Export QR
            </button>
          ) : (
            table.status === "active" && (
              <button
                type="button"
                onClick={() => onGenerateQr(table.id)}
                disabled={isGeneratingQr}
                className={`w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-medium ${primaryButton}`}
              >
                {isGeneratingQr ? "Generating..." : "Generate QR"}
              </button>
            )
          )}
          {table.status === "active" && (
            <button
              type="button"
              onClick={() => onDeactivate(table.id)}
              className={`w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-medium ${secondaryButton}`}
            >
              Deactivate
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full cursor-pointer py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Close
        </button>
      </div>
    </div>
  );
}
