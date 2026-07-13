"use client";

import { showToast } from "@/modules/shared/feedback";
import { primaryButton, secondaryButton } from "@/modules/shared/theme/classNames";
import type { VenueTable } from "../types";
import type { TableDetailBusy } from "./tableDetailTypes";

type TableDetailActionsProps = {
  table: VenueTable;
  busy: TableDetailBusy;
  disabled: boolean;
  onGenerateQr: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
};

const actionButton =
  "w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-medium";

export function TableDetailActions({
  table,
  busy,
  disabled,
  onGenerateQr,
  onActivate,
  onDeactivate,
}: TableDetailActionsProps) {
  const isActive = table.status === "active";
  const hasQr = Boolean(table.qrImageUrl);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {hasQr ? (
        <button
          type="button"
          onClick={() => showToast("Export QR coming soon.", "success")}
          disabled={disabled}
          className={`${actionButton} ${primaryButton}`}
        >
          Export QR
        </button>
      ) : (
        isActive && (
          <button
            type="button"
            onClick={onGenerateQr}
            disabled={disabled}
            className={`${actionButton} ${primaryButton}`}
          >
            {busy.generatingQr ? "Generating..." : "Generate QR"}
          </button>
        )
      )}

      {isActive ? (
        <button
          type="button"
          onClick={onDeactivate}
          disabled={disabled}
          className={`${actionButton} ${secondaryButton}`}
        >
          {busy.togglingStatus ? "Deactivating..." : "Deactivate"}
        </button>
      ) : (
        <button
          type="button"
          onClick={onActivate}
          disabled={disabled}
          className={`${actionButton} ${primaryButton}`}
        >
          {busy.togglingStatus ? "Activating..." : "Activate"}
        </button>
      )}
    </div>
  );
}
