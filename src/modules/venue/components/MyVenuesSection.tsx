"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/modules/shared/api";
import { getMyVenues } from "../api/venueApi";
import type { VenueMembership } from "../api/types";
import { VenueCard } from "./VenueCard";

function formatRole(role: VenueMembership["role"]): string {
  return role === "MANAGER" ? "Manager" : "Waiter";
}

function RoleBadge({ role }: { role: VenueMembership["role"] }) {
  const label = formatRole(role);

  if (role === "MANAGER") {
    return (
      <span className="text-sm px-2.5 py-0.5 rounded-full font-medium bg-orange-100 text-orange-800 border border-orange-200/80">
        {label}
      </span>
    );
  }

  return (
    <span className="text-sm px-2.5 py-0.5 rounded-full font-medium bg-green-100 text-green-800 border border-green-200/80">
      {label}
    </span>
  );
}

function VenueListSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="h-12 rounded-2xl bg-black/5" />
      ))}
    </div>
  );
}

export function MyVenuesSection() {
  const router = useRouter();
  const [venues, setVenues] = useState<VenueMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVenues = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getMyVenues();
      setVenues(data);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Couldn't load your venues. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadVenues();
  }, [loadVenues]);

  return (
    <VenueCard>
      <h2 className="text-lg font-semibold tracking-tight text-black mb-4">My Venues</h2>

      {loading ? <VenueListSkeleton /> : null}

      {!loading && error ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <p className="text-sm text-zinc-600">{error}</p>
          <button
            type="button"
            onClick={() => void loadVenues()}
            className="text-sm font-medium text-black underline underline-offset-2 hover:text-zinc-700"
          >
            Retry
          </button>
        </div>
      ) : null}

      {!loading && !error && venues.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          {venues.map((venue) => (
            <button
              key={venue.venueId}
              type="button"
              onClick={() => router.push(`/venue/${venue.venueId}/staff`)}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-black/10 bg-black/[0.02] hover:bg-black/5 hover:border-black/20 transition-all duration-200 text-left w-full"
            >
              <span className="text-sm font-medium text-black">{venue.venueName}</span>
              <RoleBadge role={venue.role} />
            </button>
          ))}
        </div>
      ) : null}

      {!loading && !error && venues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <span className="text-zinc-300 mb-2">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </span>
          <p className="text-sm text-zinc-600 font-light">You haven&apos;t joined any venues yet.</p>
        </div>
      ) : null}
    </VenueCard>
  );
}
