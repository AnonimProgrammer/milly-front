"use client";

import { useCallback, useEffect, useState } from "react";
import { getRequestErrorMessage } from "@/modules/shared/api";
import { getMyVenues } from "../api/venueApi";
import type { VenueMembership } from "../api/types";

export function useMyVenues() {
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
      setError(getRequestErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadVenues();
  }, [loadVenues]);

  return {
    venues,
    loading,
    error,
    reload: loadVenues,
  };
}
