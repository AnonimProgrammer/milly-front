"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { withReturnTo } from "@/modules/shared/navigation";
import { listRow, loginButton, textMuted } from "@/modules/shared/theme/classNames";

export function GuestProfileCard() {
  const pathname = usePathname();
  const loginHref = withReturnTo("/login", pathname);

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
