"use client";

import { useState, type SubmitEvent } from "react";
import { BackButton, PageHeader } from "@/modules/shared/ui";
import { UserAccountNav } from "@/modules/auth/components/UserAccountNav";
import { VenueCard } from "./VenueCard";

export function RegisterVenuePage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white font-sans antialiased relative overflow-hidden p-6">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-black/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-black/5 blur-[80px] pointer-events-none" />

      <PageHeader leading={<BackButton />} trailing={<UserAccountNav />} />

      <div className="flex-1 flex items-center justify-center py-8 z-10 w-full max-w-md mx-auto">
        <VenueCard>
          <h2 className="text-lg font-semibold tracking-tight text-black mb-1">Register Venue</h2>
          <p className="text-xs text-zinc-600 font-light mb-5">
            Set up your venue ordering profile on Milly.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="venueName" className="text-xs font-medium text-zinc-600">
                Venue Name
              </label>
              <input
                id="venueName"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Riverside Café"
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-sm text-black transition-all focus:border-black/30 focus:ring-1 focus:ring-black/20 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="location" className="text-xs font-medium text-zinc-600">
                Location
              </label>
              <input
                id="location"
                type="text"
                required
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. 123 Main St, New York"
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-sm text-black transition-all focus:border-black/30 focus:ring-1 focus:ring-black/20 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black text-white text-sm font-medium transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99]"
            >
              Create Venue
            </button>
          </form>
        </VenueCard>
      </div>

      <footer className="w-full max-w-7xl mx-auto py-4 text-center text-xs text-zinc-500 z-10 font-light">
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </main>
  );
}
