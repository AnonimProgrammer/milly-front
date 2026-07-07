"use client";

import type { ReactNode } from "react";
import { FeedbackProvider } from "@/modules/shared/feedback";
import { AuthProvider } from "../context/AuthProvider";

type AuthWrapperProps = {
  children: ReactNode;
};

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <AuthProvider>
      <FeedbackProvider>{children}</FeedbackProvider>
    </AuthProvider>
  );
}
