"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/modules/auth";
import { withReturnTo } from "@/modules/shared/navigation";
import { listRow, loginButton, textMuted } from "@/modules/shared/theme/classNames";

export function ProfileSection() {
  const { user, status } = useAuth();
  const pathname = usePathname();
  const loginHref = withReturnTo("/login", pathname);

  if (status === "loading") {
    return <div className="h-16 w-full animate-pulse rounded-2xl bg-muted" />;
  }

  if (status === "authenticated" && user) {
    return (
      <div className={`flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center ${listRow}`}>
        <div>
          <p className="text-base font-medium text-foreground">
            {user.firstName} {user.lastName}
          </p>
          <p className={`mt-0.5 text-sm font-light ${textMuted}`}>
            {user.email ?? "No email provided"}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Signed In
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center ${listRow}`}>
      <div>
        <p className="text-base font-medium text-foreground">Guest Account</p>
        <p className={`mt-0.5 text-sm font-light ${textMuted}`}>
          Sign in to sync your venue history and billing details.
        </p>
      </div>
      <Link href={loginHref} className={loginButton}>
        Log In
      </Link>
    </div>
  );
}
