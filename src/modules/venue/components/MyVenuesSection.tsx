"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startUiActivity } from "@/modules/shared/api";
import { staffPath } from "@/modules/staff";
import { useMyVenues } from "../hooks/useMyVenues";
import { MyVenuesEmptyState } from "./MyVenuesEmptyState";
import { MyVenuesErrorState } from "./MyVenuesErrorState";
import { VenueCard } from "./VenueCard";
import { VenueListSkeleton } from "./VenueListSkeleton";
import { VenueMembershipRow } from "./VenueMembershipRow";

export function MyVenuesSection() {
  const router = useRouter();
  const { venues, loading, error, reload } = useMyVenues();
  const [navigatingVenueId, setNavigatingVenueId] = useState<string | null>(null);

  const handleVenueSelect = (venueId: string) => {
    if (navigatingVenueId) {
      return;
    }

    setNavigatingVenueId(venueId);
    startUiActivity();
    router.push(staffPath(venueId, "orders"));
  };

  return (
    <VenueCard>
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground">My Venues</h2>

      {loading ? <VenueListSkeleton /> : null}

      {!loading && error ? (
        <MyVenuesErrorState message={error} onRetry={() => void reload()} />
      ) : null}

      {!loading && !error && venues.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          {venues.map((venue) => (
            <VenueMembershipRow
              key={venue.venueId}
              venue={venue}
              isNavigating={navigatingVenueId === venue.venueId}
              disabled={navigatingVenueId !== null}
              onSelect={handleVenueSelect}
            />
          ))}
        </div>
      ) : null}

      {!loading && !error && venues.length === 0 ? <MyVenuesEmptyState /> : null}
    </VenueCard>
  );
}
