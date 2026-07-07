"use client";

import type { ReactNode } from "react";
import { FeedbackProvider } from "@/modules/shared/feedback";
import { AuthProvider } from "../context/AuthProvider";
import { GoogleAuthProvider } from "./GoogleAuthProvider";

type AuthWrapperProps = {
  children: ReactNode;
};

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <GoogleAuthProvider>
      <AuthProvider>
        <FeedbackProvider>{children}</FeedbackProvider>
      </AuthProvider>
    </GoogleAuthProvider>
  );
}
