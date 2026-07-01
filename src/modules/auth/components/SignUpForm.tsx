"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiError } from "@/modules/shared/api";
import { useAuth } from "../context/AuthProvider";
import { authLink } from "../utils/authLinks";
import { resolvePostAuthRedirect } from "../utils/postAuthRedirect";

type SignUpFormProps = {
  intent: string | null;
};

export function SignUpForm({ intent }: SignUpFormProps) {
  const router = useRouter();
  const { signUp } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const trimmedEmail = email.trim();

    try {
      await signUp(trimmedEmail, password, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: trimmedEmail,
        birthDate,
      });
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
      <h2 className="text-2xl font-semibold tracking-tight text-black text-center">Create an account</h2>
      <p className="mt-2 text-sm text-zinc-600 font-light text-center">Start your journey with Milly.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className="text-xs font-medium text-zinc-600">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Alex"
              className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-black transition-all focus:border-black focus:ring-1 focus:ring-black outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lastName" className="text-xs font-medium text-zinc-600">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Rivera"
              className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-black transition-all focus:border-black focus:ring-1 focus:ring-black outline-none"
            />
          </div>
        </div>

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
          <label htmlFor="birthDate" className="text-xs font-medium text-zinc-600">
            Date of Birth
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            autoComplete="bday"
            required
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
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
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-black transition-all focus:border-black focus:ring-1 focus:ring-black outline-none"
          />
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
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600">
        Already have an account?{" "}
        <Link href={authLink("/login", intent)} className="font-medium text-black hover:underline">
          Sign In
        </Link>
      </p>
    </>
  );
}
