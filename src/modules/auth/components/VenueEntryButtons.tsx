"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthProvider";
import { resolveVenueEntryPath } from "../utils/authLinks";

export function VenueEntryButtons() {
  const { status } = useAuth();

  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        href={resolveVenueEntryPath("join-venue", status)}
        className="flex w-40 items-center justify-center whitespace-nowrap px-4 py-3.5 rounded-full font-medium text-sm text-white bg-black shadow-lg shadow-black/20 transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98]"
      >
        Join Venue
      </Link>
      <Link
        href={resolveVenueEntryPath("register-venue", status)}
        className="flex w-40 items-center justify-center whitespace-nowrap px-4 py-3.5 rounded-full font-medium text-sm text-black border border-black/30 bg-transparent shadow-lg shadow-black/20 transition-all duration-300 hover:bg-black/5 hover:border-black/60 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98]"
      >
        Register Venue
      </Link>
    </div>
  );
}
