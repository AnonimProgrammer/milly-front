"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import { AuthPageFallback } from "./AuthPageFallback";

type RequireAuthProps = {
  children: React.ReactNode;
  loginIntent?: string;
};

export function RequireAuth({ children, loginIntent }: RequireAuthProps) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "anonymous") {
      const redirectPath = loginIntent
        ? `/login?intent=${encodeURIComponent(loginIntent)}`
        : "/";
      router.replace(redirectPath);
    }
  }, [status, router, loginIntent]);

  if (status === "loading") {
    return <AuthPageFallback />;
  }

  if (status === "anonymous") {
    return null;
  }

  return children;
}
