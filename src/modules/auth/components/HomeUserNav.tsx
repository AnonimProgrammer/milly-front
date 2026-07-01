"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthProvider";

function UserIconCircle() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5">
      <svg
        className="h-6 w-6 text-zinc-700"
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
    </span>
  );
}

export function HomeUserNav() {
  const { user, status } = useAuth();

  return (
    <header className="absolute top-0 right-0 z-20 px-6 py-6">
      <div className="flex items-center gap-3">
        {status === "authenticated" && user ? (
          <span className="text-base font-medium text-black">
            {user.firstName} {user.lastName}
          </span>
        ) : null}

        {status === "anonymous" ? (
          <>
            <Link href="/signup" className="text-base font-medium text-black hover:underline">
              Sign Up
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-black px-5 py-2.5 text-base font-medium text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98]"
            >
              Log In
            </Link>
          </>
        ) : null}

        <UserIconCircle />
      </div>
    </header>
  );
}
