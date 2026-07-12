"use client";

import { useCallback, useEffect, useLayoutEffect, useState, type RefObject } from "react";

export type ChatPanelPosition =
  | {
      mode: "sheet";
    }
  | {
      mode: "anchored";
      top: number;
      right: number;
      width: number;
    };

const MOBILE_BREAKPOINT = 640;

export function useChatPanelPosition(
  open: boolean,
  triggerRef: RefObject<HTMLButtonElement | null>,
  onClose: () => void,
) {
  const [mounted, setMounted] = useState(false);
  const [panelPosition, setPanelPosition] = useState<ChatPanelPosition | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePanelPosition = useCallback(() => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      setPanelPosition({ mode: "sheet" });
      return;
    }

    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const width = Math.min(384, window.innerWidth - 24);

    setPanelPosition({
      mode: "anchored",
      top: rect.bottom + 8,
      right: Math.max(12, window.innerWidth - rect.right),
      width,
    });
  }, [triggerRef]);

  useLayoutEffect(() => {
    if (!open) {
      setPanelPosition(null);
      return;
    }

    updatePanelPosition();

    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);

    return () => {
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [open, updatePanelPosition]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || panelPosition?.mode !== "sheet") {
      return;
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, panelPosition?.mode]);

  return { mounted, panelPosition };
}
