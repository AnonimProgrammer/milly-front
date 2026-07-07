"use client";

import { useEffect } from "react";

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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-venue-confirm-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="join-venue-confirm-title" className="text-xl font-bold text-black">
          You&apos;re in!
        </h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-zinc-600">
          You&apos;ve joined <span className="font-medium text-black">{venueName}</span>. Would you
          like to go there now?
        </p>

        <button
          type="button"
          onClick={onConfirm}
          className="mt-6 w-full cursor-pointer rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Go to {venueName}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full cursor-pointer py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-black"
        >
          Stay here
        </button>
      </div>
    </div>
  );
}
