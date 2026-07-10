"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { isAuthenticatedStatus } from "../utils/authLinks";

function UserIcon() {
  return (
    <svg
      className="h-6 w-6 text-zinc-700 dark:text-zinc-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function UserIconCircle() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 transition-colors">
      <UserIcon />
    </span>
  );
}

export function UserAccountNav() {
  const { user, status, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex items-center gap-3">
      {isAuthenticatedStatus(status) && user ? (
        <span className="text-base font-medium text-black dark:text-zinc-200">
          {user.firstName} {user.lastName}
        </span>
      ) : null}

      {!isAuthenticatedStatus(status) ? (
        <>
          <Link href="/signup" className="text-base font-medium text-black dark:text-zinc-200 hover:underline">
            Sign Up
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-black dark:bg-white px-5 py-2.5 text-base font-medium text-white dark:text-black shadow-lg shadow-black/20 dark:shadow-white/5 transition-all duration-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98]"
          >
            Log In
          </Link>
        </>
      ) : null}

      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-full transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 cursor-pointer"
        >
          <UserIconCircle />
        </button>

        {menuOpen ? (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+0.5rem)] min-w-36 rounded-xl border border-black/10 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-1 shadow-lg shadow-black/10 dark:shadow-black/35 z-30"
          >
            <Link
              href="/settings"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="block w-full px-4 py-2.5 text-left text-sm font-medium text-black dark:text-zinc-200 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            >
              Settings
            </Link>
            {isAuthenticatedStatus(status) ? (
              <button
                type="button"
                role="menuitem"
                disabled={isLoggingOut}
                onClick={() => void handleLogout()}
                className="w-full px-4 py-2.5 text-left text-sm font-medium text-black dark:text-zinc-200 transition-colors hover:bg-black/5 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60 border-t border-black/5 dark:border-zinc-800"
              >
                {isLoggingOut ? "Logging out..." : "Log out"}
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-4 py-2.5 text-left text-sm font-medium text-black dark:text-zinc-200 transition-colors hover:bg-black/5 dark:hover:bg-white/5 border-t border-black/5 dark:border-zinc-800"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-4 py-2.5 text-left text-sm font-medium text-black dark:text-zinc-200 transition-colors hover:bg-black/5 dark:hover:bg-white/5 border-t border-black/5 dark:border-zinc-800"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
