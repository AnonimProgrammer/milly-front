"use client";

import { useEffect } from "react";
import { modalOverlay, modalPanel, textMuted } from "@/modules/shared/theme/classNames";
import type { VenueTable } from "../types";
import { TableDetailActions } from "./TableDetailActions";
import { TableLabelEditor } from "./TableLabelEditor";
import { TableQrPreview } from "./TableQrPreview";
import { TableStatusBadge } from "./TableStatusBadge";
import type { TableDetailBusy } from "./tableDetailTypes";

export type { TableDetailBusy };

type TableDetailModalProps = {
  table: VenueTable;
  busy: TableDetailBusy;
  onClose: () => void;
  onUpdateLabel: (label: string) => void;
  onGenerateQr: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
};

export function TableDetailModal({
  table,
  busy,
  onClose,
  onUpdateLabel,
  onGenerateQr,
  onActivate,
  onDeactivate,
}: TableDetailModalProps) {
  const isBusy = busy.savingLabel || busy.generatingQr || busy.togglingStatus;

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className={modalOverlay} onClick={onClose} role="presentation">
      <div
        className={modalPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="table-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 id="table-detail-title" className="text-xl font-bold text-foreground">
              Edit table
            </h3>
            <p className={`mt-1 font-mono text-xs ${textMuted}`}>{table.id}</p>
          </div>
          <TableStatusBadge status={table.status} size="md" />
        </header>

        <TableLabelEditor
          initialLabel={table.label}
          disabled={isBusy}
          isSaving={busy.savingLabel}
          onSave={onUpdateLabel}
        />

        <TableQrPreview table={table} />

        <TableDetailActions
          table={table}
          busy={busy}
          disabled={isBusy}
          onGenerateQr={onGenerateQr}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
        />

        <button
          type="button"
          onClick={onClose}
          disabled={isBusy}
          className="mt-4 w-full cursor-pointer py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          Close
        </button>
      </div>
    </div>
  );
}
