"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiError } from "@/modules/shared/api";
import { inputField, primaryButton, textMuted } from "@/modules/shared/theme/classNames";
import { useAuth } from "../context/AuthProvider";
import { authLink } from "../utils/authLinks";
import { resolvePostAuthRedirect } from "../utils/postAuthRedirect";

type SignInFormProps = {
  intent: string | null;
};

export function SignInForm({ intent }: SignInFormProps) {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn(email.trim(), password);
      router.replace(resolvePostAuthRedirect(intent));
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground text-center">Sign in</h2>
      <p className={`mt-2 text-sm font-light text-center ${textMuted}`}>
        Welcome back! Please enter your details.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={`text-xs font-medium ${textMuted}`}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            className={inputField}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className={`text-xs font-medium ${textMuted}`}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className={inputField}
          />
        </div>

        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-2 w-full py-3.5 rounded-full text-sm font-medium shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 ${primaryButton}`}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className={`mt-6 text-center text-sm ${textMuted}`}>
        Don&apos;t have an account?{" "}
        <Link href={authLink("/signup", intent)} className="font-medium text-foreground hover:underline">
          Sign Up
        </Link>
      </p>
    </>
  );
}
