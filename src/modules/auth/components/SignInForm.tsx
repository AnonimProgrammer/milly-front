"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiError } from "@/modules/shared/api";
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
      <h2 className="text-2xl font-semibold tracking-tight text-black text-center">Sign in</h2>
      <p className="mt-2 text-sm text-zinc-600 font-light text-center">
        Welcome back! Please enter your details.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-zinc-600">
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
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-black transition-all focus:border-black focus:ring-1 focus:ring-black outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-medium text-zinc-600">
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
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-black transition-all focus:border-black focus:ring-1 focus:ring-black outline-none"
          />
        </div>

        <div className="flex items-center justify-end">
          <button type="button" className="text-xs font-medium text-black hover:underline">
            Forgot password?
          </button>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full py-3.5 rounded-full bg-black text-white text-sm font-medium shadow-lg shadow-black/20 transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600">
        Don&apos;t have an account?{" "}
        <Link href={authLink("/signup", intent)} className="font-medium text-black hover:underline">
          Sign Up
        </Link>
      </p>
    </>
  );
}
