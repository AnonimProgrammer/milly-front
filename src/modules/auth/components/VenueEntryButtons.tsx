"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthProvider";
import { resolveVenueEntryPath } from "../utils/authLinks";

const venueButtonClass =
  "flex w-40 items-center justify-center whitespace-nowrap px-4 py-3.5 rounded-full font-medium text-sm bg-primary text-primary-foreground shadow-md shadow-black/10 transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]";

export function VenueEntryButtons() {
  const { status } = useAuth();

  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        href={resolveVenueEntryPath("join-venue", status)}
        className={venueButtonClass}
      >
        Join Venue
      </Link>
      <Link
        href={resolveVenueEntryPath("register-venue", status)}
        className={venueButtonClass}
      >
        Register Venue
      </Link>
    </div>
  );
}
