"use client";

import { useEffect } from "react";
import { modalOverlay, modalPanel, primaryButton, textMuted } from "@/modules/shared/theme/classNames";

type JoinVenueConfirmModalProps = {
  venueName: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function JoinVenueConfirmModal({
  venueName,
  onConfirm,
  onClose,
}: JoinVenueConfirmModalProps) {
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
      className={modalOverlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={modalPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-venue-confirm-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="join-venue-confirm-title" className="text-xl font-bold text-foreground">
          You&apos;re in!
        </h3>
        <p className={`mt-3 text-sm font-light leading-relaxed ${textMuted}`}>
          You&apos;ve joined <span className="font-medium text-foreground">{venueName}</span>. Would you
          like to go there now?
        </p>

        <button
          type="button"
          onClick={onConfirm}
          className={`mt-6 w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-medium ${primaryButton}`}
        >
          Go to {venueName}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full cursor-pointer py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Stay here
        </button>
      </div>
    </div>
  );
}
