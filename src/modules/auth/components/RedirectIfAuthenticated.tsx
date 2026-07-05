"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import { isAuthenticatedStatus } from "../utils/authLinks";
import { resolvePostAuthRedirect } from "../utils/postAuthRedirect";
import { AuthPageFallback } from "./AuthPageFallback";

type RedirectIfAuthenticatedProps = {
  intent: string | null;
  children: React.ReactNode;
};

export function RedirectIfAuthenticated({ intent, children }: RedirectIfAuthenticatedProps) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticatedStatus(status)) {
      router.replace(resolvePostAuthRedirect(intent));
    }
  }, [status, intent, router]);

  if (status === "loading" || isAuthenticatedStatus(status)) {
    return <AuthPageFallback />;
  }

  return children;
}
