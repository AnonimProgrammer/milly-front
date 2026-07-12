"use client";

import { showToast } from "@/modules/shared/feedback";
import { useGoogleSignIn } from "../hooks/useGoogleSignIn";
import { AppleIcon, GoogleIcon } from "./oauthIcons";

type OAuthButtonsProps = {
  intent: string | null;
};

const oauthButtonClassName =
  "inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60";

export function OAuthButtons({ intent }: OAuthButtonsProps) {
  const {
    error,
    googleButtonRef,
    isGoogleEnabled,
    isGoogleReady,
    isSubmitting,
    triggerGoogleSignIn,
  } = useGoogleSignIn(intent);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          {isGoogleEnabled ? (
            <div ref={googleButtonRef} className="absolute h-0 w-0 overflow-hidden" aria-hidden />
          ) : null}

          <button
            type="button"
            onClick={triggerGoogleSignIn}
            disabled={!isGoogleEnabled || isSubmitting || !isGoogleReady}
            className={oauthButtonClassName}
          >
            <GoogleIcon className="h-5 w-5" />
            {isSubmitting ? "Signing in..." : "Google"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => showToast("This feature is under development. Try again later!", "success")}
          className={oauthButtonClassName}
        >
          <AppleIcon className="h-5 w-5" />
          Apple
        </button>
      </div>

      {error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
