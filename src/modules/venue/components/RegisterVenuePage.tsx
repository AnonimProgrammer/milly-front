"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/modules/shared/api";
import { staffPath } from "@/modules/staff";
import { inputField, pageMain, primaryButton, selectionTheme, textMuted } from "@/modules/shared/theme/classNames";
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
    <main className={`min-h-screen flex flex-col justify-between p-6 ${pageMain} ${selectionTheme}`}>
      <PageHeader leading={<BrandBackNav />} trailing={<UserAccountNav />} />

      <div className="flex-1 flex items-center justify-center py-8 z-10 w-full max-w-md mx-auto">
        <VenueCard>
          <h2 className="text-lg font-semibold tracking-tight text-foreground mb-1">Register Venue</h2>
          <p className={`text-xs font-light mb-5 ${textMuted}`}>
            Set up your venue ordering profile on Milly.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="venueName" className={`text-xs font-medium ${textMuted}`}>
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
                className={inputField}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="location" className={`text-xs font-medium ${textMuted}`}>
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
              className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:hover:scale-100 ${primaryButton}`}
            >
              {isSubmitting ? "Creating venue..." : "Create Venue"}
            </button>
          </form>
        </VenueCard>
      </div>

      <footer className={`w-full max-w-7xl mx-auto py-4 text-center text-xs z-10 font-light ${textMuted}`}>
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </main>
  );
}
