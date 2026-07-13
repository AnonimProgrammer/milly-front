"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { adminPath, isAdminRoute } from "@/modules/admin/utils/adminRoutes";
import { isSystemAdmin } from "@/modules/admin/utils/isAdmin";
import { shouldCaptureReturnTo, withReturnTo } from "@/modules/shared/navigation";
import { loginButton } from "@/modules/shared/theme/classNames";
import { useAuth } from "../context/AuthProvider";
import { isAuthenticatedStatus } from "../utils/authLinks";

function SettingsIconButton() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted transition-colors sm:h-10 sm:w-10">
      <Settings className="h-4 w-4 text-foreground sm:h-[22px] sm:w-[22px]" strokeWidth={1.75} />
    </span>
  );
}

export function UserAccountNav() {
  const { user, status, signOut } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = isAuthenticatedStatus(status);
  const showAdminConsole = isAuthenticated && isSystemAdmin(user) && !isAdminRoute(pathname);

  const settingsHref = shouldCaptureReturnTo(pathname)
    ? withReturnTo("/settings", pathname)
    : "/settings";
  const profileHref = shouldCaptureReturnTo(pathname)
    ? withReturnTo("/settings/profile", pathname)
    : "/settings/profile";

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

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await signOut();
      setMenuOpen(false);
    } finally {
      setIsLoggingOut(false);
    }
  }

  const menuItemClass =
    "block w-full px-4 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted";

  return (
    <div className="flex items-center gap-3">
      {showAdminConsole ? (
        <Link
          href={adminPath("users")}
          className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Admin Console
        </Link>
      ) : null}

      {isAuthenticated && user ? (
        <span className="text-base font-medium text-foreground">
          {user.firstName} {user.lastName}
        </span>
      ) : null}

      {!isAuthenticated ? (
        <>
          <Link href="/signup" className="text-base font-medium text-foreground hover:underline">
            Sign Up
          </Link>
          <Link href="/login" className={loginButton}>
            Log In
          </Link>
        </>
      ) : null}

      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-label="Account menu"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-full transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          <SettingsIconButton />
        </button>

        {menuOpen ? (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+0.5rem)] min-w-40 rounded-xl border border-border bg-card py-1 shadow-lg z-30"
          >
            <Link
              href={settingsHref}
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className={menuItemClass}
            >
              Settings
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href={profileHref}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className={`${menuItemClass} border-t border-border`}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  disabled={isLoggingOut}
                  onClick={() => void handleLogout()}
                  className={`${menuItemClass} disabled:cursor-not-allowed disabled:opacity-60 border-t border-border`}
                >
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
