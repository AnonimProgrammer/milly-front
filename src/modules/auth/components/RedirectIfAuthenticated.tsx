"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
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
    if (status === "authenticated") {
      router.replace(resolvePostAuthRedirect(intent));
    }
  }, [status, intent, router]);

  if (status === "loading" || status === "authenticated") {
    return <AuthPageFallback />;
  }

  return children;
}
