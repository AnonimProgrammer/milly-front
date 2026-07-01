"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import { AuthPageFallback } from "./AuthPageFallback";

type RequireAuthProps = {
  children: React.ReactNode;
  intent: string;
};

export function RequireAuth({ children, intent }: RequireAuthProps) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "anonymous") {
      router.replace(`/login?intent=${encodeURIComponent(intent)}`);
    }
  }, [status, intent, router]);

  if (status === "loading") {
    return <AuthPageFallback />;
  }

  if (status === "anonymous") {
    return null;
  }

  return children;
}
