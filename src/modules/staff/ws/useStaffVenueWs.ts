"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/auth";
import { getSessionHandlers } from "@/modules/shared/api";
import { StaffVenueWsClient } from "./staffVenueWsClient";
import { issueWsTicket } from "./wsTicketApi";

export function useStaffVenueWs(venueId: string, onOrderEvent: () => void): void {
  const router = useRouter();
  const { status } = useAuth();
  const onOrderEventRef = useRef(onOrderEvent);

  useEffect(() => {
    onOrderEventRef.current = onOrderEvent;
  });

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const client = new StaffVenueWsClient({
      venueId,
      fetchTicket: async () => {
        const ticket = await issueWsTicket();
        return ticket.ticketId;
      },
      onOrderEvent: () => {
        onOrderEventRef.current();
      },
      onUnauthorized: () => {
        getSessionHandlers().onSessionExpired?.();
        router.replace("/");
      },
    });

    client.connect();

    return () => {
      client.disconnect();
    };
  }, [venueId, status, router]);
}
