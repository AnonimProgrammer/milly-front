"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRequestErrorMessage, startUiActivity } from "@/modules/shared/api";
import { listRow, spinnerRing, textMuted } from "@/modules/shared/theme/classNames";
import { staffPath } from "@/modules/staff";
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
      <span className="text-sm px-2.5 py-0.5 rounded-full font-medium bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 border border-orange-200/80 dark:border-orange-800/40">
        {label}
      </span>
    );
  }

  return (
    <span className="text-sm px-2.5 py-0.5 rounded-full font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200/80 dark:border-green-800/40">
      {label}
    </span>
  );
}

function VenueListSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="h-12 rounded-2xl bg-muted" />
      ))}
    </div>
  );
}

function VenueRowSpinner() {
  return (
    <div className={`h-4 w-4 ${spinnerRing}`} aria-hidden="true" />
  );
}

export function MyVenuesSection() {
  const router = useRouter();
  const [venues, setVenues] = useState<VenueMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [navigatingVenueId, setNavigatingVenueId] = useState<string | null>(null);

  const handleVenueSelect = (venueId: string) => {
    if (navigatingVenueId) {
      return;
    }

    setNavigatingVenueId(venueId);
    startUiActivity();
    router.push(staffPath(venueId, "orders"));
  };

  const loadVenues = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getMyVenues();
      setVenues(data);
    } catch (err) {
      setError(getRequestErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadVenues();
  }, [loadVenues]);

  return (
    <VenueCard>
      <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4">My Venues</h2>

      {loading ? <VenueListSkeleton /> : null}

      {!loading && error ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <p className={`text-sm ${textMuted}`}>{error}</p>
          <button
            type="button"
            onClick={() => void loadVenues()}
            className="text-sm font-medium text-foreground underline underline-offset-2 hover:text-muted-foreground"
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
              disabled={navigatingVenueId !== null}
              onClick={() => handleVenueSelect(venue.venueId)}
              className={`flex items-center justify-between p-3.5 text-left w-full disabled:cursor-wait ${listRow} ${
                navigatingVenueId === venue.venueId ? "opacity-70" : ""
              }`}
            >
              <span className="text-sm font-medium text-foreground">{venue.venueName}</span>
              {navigatingVenueId === venue.venueId ? (
                <VenueRowSpinner />
              ) : (
                <RoleBadge role={venue.role} />
              )}
            </button>
          ))}
        </div>
      ) : null}

      {!loading && !error && venues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <span className="text-muted-foreground/40 mb-2">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </span>
          <p className={`text-sm font-light ${textMuted}`}>You haven&apos;t joined any venues yet.</p>
        </div>
      ) : null}
    </VenueCard>
  );
}
