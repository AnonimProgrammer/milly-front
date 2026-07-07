"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";
import { getGoogleClientId } from "../utils/googleIdToken";

type GoogleAuthProviderProps = {
  children: ReactNode;
};

export function GoogleAuthProvider({ children }: GoogleAuthProviderProps) {
  const clientId = getGoogleClientId();

  if (!clientId) {
    return children;
  }

  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}
