import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Milly</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Restaurant ordering platform
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/login?intent=join-venue"
          className="rounded-lg bg-zinc-900 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Join Venue
        </Link>
        <Link
          href="/login?intent=register-venue"
          className="rounded-lg border border-zinc-300 px-6 py-3 text-center text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          Register Venue
        </Link>
      </div>
    </main>
  );
}
