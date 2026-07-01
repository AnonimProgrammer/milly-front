import Link from "next/link";
import { authLink } from "../utils/authLinks";

type SignInFormProps = {
  intent: string | null;
};

export function SignInForm({ intent }: SignInFormProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold tracking-tight text-black text-center">Sign in</h2>
      <p className="mt-2 text-sm text-zinc-600 font-light text-center">
        Welcome back! Please enter your details.
      </p>

      <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-zinc-600">
            Email Address
          </label>
          <input
            id="email"
            type="email"
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
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-black transition-all focus:border-black focus:ring-1 focus:ring-black outline-none"
          />
        </div>

        <div className="flex items-center justify-end">
          <button type="button" className="text-xs font-medium text-black hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-3.5 rounded-full bg-black text-white text-sm font-medium shadow-lg shadow-black/20 transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98]"
        >
          Sign In
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
