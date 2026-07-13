"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthPageFallback, useAuth } from "@/modules/auth";
import { isSystemAdmin } from "../utils/isAdmin";

type RequireAdminProps = {
  children: ReactNode;
};

export function RequireAdmin({ children }: RequireAdminProps) {
  const { user, status } = useAuth();
  const router = useRouter();
  const isAdmin = isSystemAdmin(user);

  useEffect(() => {
    if (status === "authenticated" && !isAdmin) {
      router.replace("/");
    }
  }, [status, isAdmin, router]);

  if (status === "loading") {
    return <main className="min-h-screen bg-transparent" aria-busy="true" />;
  }

  if (status !== "authenticated" || !isAdmin) {
    return <AuthPageFallback />;
  }

  return children;
}
