"use client";

import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ApiError } from "@/modules/shared/api";
import { showToast } from "@/modules/shared/feedback";
import { useAuth } from "../context/AuthProvider";
import { getGoogleClientId, parseGoogleIdToken } from "../utils/googleIdToken";
import { resolvePostAuthRedirect } from "../utils/postAuthRedirect";

type OAuthButtonsProps = {
  intent: string | null;
};

export function OAuthButtons({ intent }: OAuthButtonsProps) {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const googleClientId = getGoogleClientId();
  const isGoogleEnabled = Boolean(googleClientId);

  async function handleGoogleSuccess(credentialResponse: CredentialResponse) {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      setError("Google sign-in did not return a valid credential.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const profile = parseGoogleIdToken(idToken);
      await signInWithGoogle(idToken, profile);
      router.replace(resolvePostAuthRedirect(intent));
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else if (submitError instanceof Error) {
        setError(submitError.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleGoogleClick() {
    if (!isGoogleEnabled || isSubmitting) {
      return;
    }

    const googleButton = googleButtonRef.current?.querySelector('div[role="button"]') as HTMLElement | null;
    googleButton?.click();
  }

  function handleAppleClick() {
    showToast("This feature is under development. Try again later!", "success");
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          {isGoogleEnabled ? (
            <div ref={googleButtonRef} className="absolute h-0 w-0 overflow-hidden" aria-hidden>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google sign-in was cancelled or failed.")}
                useOneTap={false}
              />
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleGoogleClick}
            disabled={!isGoogleEnabled || isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/30 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:border-black/60 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isSubmitting ? "Signing in..." : "Google"}
          </button>
        </div>

        <button
          type="button"
          onClick={handleAppleClick}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-black/30 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:border-black/60 hover:bg-black/5"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.63.73-1.18 1.87-1.03 2.98.12.01.24.02.36.02.88 0 2.03-.54 2.62-1.45" />
          </svg>
          Apple
        </button>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
