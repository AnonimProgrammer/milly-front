"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import { AuthPageFallback } from "./AuthPageFallback";

type RequireAuthProps = {
  children: React.ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "anonymous") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <AuthPageFallback />;
  }

  if (status === "anonymous") {
    return null;
  }

  return children;
}
