"use client";

import { useCallback, useEffect, useLayoutEffect, useState, type RefObject } from "react";

export type ChatPanelPosition = {
  top: number;
  right: number;
  width: number;
};

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
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const width = Math.min(384, window.innerWidth - 24);

    setPanelPosition({
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

  return { mounted, panelPosition };
}
