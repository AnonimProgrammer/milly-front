"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { shouldCaptureReturnTo, withReturnTo } from "@/modules/shared/navigation";

export function SettingsMenuButton() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const settingsHref = shouldCaptureReturnTo(pathname)
    ? withReturnTo("/settings", pathname)
    : "/settings";

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <div ref={menuRef} className="relative overflow-visible">
      <button
        type="button"
        aria-label="Settings menu"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        onClick={() => setMenuOpen((open) => !open)}
        className="rounded-full transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted transition-colors sm:h-10 sm:w-10">
          <Settings className="h-4 w-4 text-foreground sm:h-[22px] sm:w-[22px]" strokeWidth={1.75} />
        </span>
      </button>

      {menuOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-30 min-w-40 rounded-xl border border-border bg-card py-1 shadow-lg"
        >
          <Link
            href={settingsHref}
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className="block w-full px-4 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Settings
          </Link>
        </div>
      ) : null}
    </div>
  );
}
