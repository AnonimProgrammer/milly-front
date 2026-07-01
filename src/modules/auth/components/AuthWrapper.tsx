"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "../context/AuthProvider";

type AuthWrapperProps = {
  children: ReactNode;
};

export function AuthWrapper({ children }: AuthWrapperProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
