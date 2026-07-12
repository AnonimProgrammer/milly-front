"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { ApiError } from "@/modules/shared/api";
import { useAuth } from "../context/AuthProvider";
import {
  ensureGoogleIdentityInitialized,
  renderGoogleSignInButton,
  setGoogleCredentialCallback,
} from "../utils/googleGsi";
import { getGoogleClientId, parseGoogleIdToken } from "../utils/googleIdToken";
import { resolvePostAuthRedirect } from "../utils/postAuthRedirect";

function getAuthErrorMessage(error: unknown): string {
  if (error instanceof ApiError || error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function useGoogleSignIn(intent: string | null) {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);

  const googleClientId = getGoogleClientId();
  const isGoogleEnabled = Boolean(googleClientId);

  const onGoogleCredential = useEffectEvent(async (idToken: string) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const profile = parseGoogleIdToken(idToken);
      await signInWithGoogle(idToken, profile);
      router.replace(resolvePostAuthRedirect(intent));
    } catch (submitError) {
      setError(getAuthErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    if (!isGoogleEnabled || !googleClientId) {
      return;
    }

    let cancelled = false;

    setGoogleCredentialCallback((idToken) => {
      void onGoogleCredential(idToken);
    });

    void ensureGoogleIdentityInitialized(googleClientId)
      .then(() => {
        if (cancelled || !googleButtonRef.current) {
          return;
        }

        renderGoogleSignInButton(googleButtonRef.current);
        setIsGoogleReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Google sign-in is unavailable right now.");
        }
      });

    return () => {
      cancelled = true;
      setGoogleCredentialCallback(null);
    };
  }, [googleClientId, isGoogleEnabled]);

  function triggerGoogleSignIn() {
    if (!isGoogleEnabled || isSubmitting || !isGoogleReady) {
      return;
    }

    const googleButton = googleButtonRef.current?.querySelector(
      'div[role="button"]',
    ) as HTMLElement | null;
    googleButton?.click();
  }

  return {
    error,
    googleButtonRef,
    isGoogleEnabled,
    isGoogleReady,
    isSubmitting,
    triggerGoogleSignIn,
  };
}
