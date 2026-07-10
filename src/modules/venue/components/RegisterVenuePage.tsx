"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/modules/shared/api";
import { staffPath } from "@/modules/staff";
import { BrandBackNav, PageHeader } from "@/modules/shared/ui";
import { UserAccountNav } from "@/modules/auth";
import { createVenue } from "../api";
import { VenueCard } from "./VenueCard";

export function RegisterVenuePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const venue = await createVenue({
        name: name.trim(),
        location: location.trim(),
      });
      router.replace(staffPath(venue.id, "orders"));
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-zinc-50 flex flex-col justify-between selection:bg-black selection:text-white selection:dark:bg-white selection:dark:text-black font-sans antialiased relative overflow-hidden p-6">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-black/5 dark:bg-white/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-black/5 dark:bg-white/5 blur-[80px] pointer-events-none" />

      <PageHeader leading={<BrandBackNav />} trailing={<UserAccountNav />} />

      <div className="flex-1 flex items-center justify-center py-8 z-10 w-full max-w-md mx-auto">
        <VenueCard>
          <h2 className="text-lg font-semibold tracking-tight text-black dark:text-zinc-100 mb-1">Register Venue</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light mb-5">
            Set up your venue ordering profile on Milly.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="venueName" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Venue Name
              </label>
              <input
                id="venueName"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Riverside Café"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-zinc-700 bg-black/[0.02] dark:bg-white/[0.03] text-sm text-black dark:text-zinc-100 transition-all focus:border-black/30 dark:focus:border-zinc-500 focus:ring-1 focus:ring-black/20 dark:focus:ring-white/10 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="location" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Location
              </label>
              <input
                id="location"
                type="text"
                required
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. 123 Main St, New York"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-zinc-700 bg-black/[0.02] dark:bg-white/[0.03] text-sm text-black dark:text-zinc-100 transition-all focus:border-black/30 dark:focus:border-zinc-500 focus:ring-1 focus:ring-black/20 dark:focus:ring-white/10 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
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
              className="w-full py-3 rounded-xl bg-black text-white text-sm font-medium transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {isSubmitting ? "Creating venue..." : "Create Venue"}
            </button>
          </form>
        </VenueCard>
      </div>

      <footer className="w-full max-w-7xl mx-auto py-4 text-center text-xs text-zinc-500 dark:text-zinc-400 z-10 font-light">
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </main>
  );
}
