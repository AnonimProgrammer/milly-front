"use client";

import { useEffect } from "react";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export function BottomSheet({
  open,
  onClose,
  children,
  title,
}: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[min(90dvh,100%)] w-full overflow-y-auto overscroll-contain rounded-t-2xl bg-card px-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 text-card-foreground shadow-xl sm:px-5 sm:pt-5">
        {title && (
          <h2 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
