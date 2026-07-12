"use client";

import { useEffect, useRef, useState, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { Order } from "../types";
import {
  fetchMappedStaffOrders,
  loadStaffSupportingData,
  type StaffOrdersSupportingData,
} from "./staffOrdersData";

type UseStaffOrdersLoaderArgs = {
  venueId: string;
  isManager: boolean;
  selectedDate: string;
  supportingDataRef: RefObject<StaffOrdersSupportingData>;
  setOrders: Dispatch<SetStateAction<Order[]>>;
};

export function useStaffOrdersLoader({
  venueId,
  isManager,
  selectedDate,
  supportingDataRef,
  setOrders,
}: UseStaffOrdersLoaderArgs) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshingOrders, setIsRefreshingOrders] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    hasLoadedOnce.current = false;
  }, [venueId]);

  useEffect(() => {
    let cancelled = false;
    const isInitialLoad = !hasLoadedOnce.current;

    if (isInitialLoad) {
      setIsLoading(true);
    } else {
      setIsRefreshingOrders(true);
    }

    setLoadFailed(false);

    void (async () => {
      try {
        const data = isInitialLoad
          ? await loadStaffSupportingData(venueId, isManager)
          : supportingDataRef.current;

        if (isInitialLoad) {
          supportingDataRef.current = data;
        }

        const nextOrders = await fetchMappedStaffOrders(venueId, selectedDate, data, {
          background: true,
        });

        if (cancelled) {
          return;
        }

        setOrders(nextOrders);
        hasLoadedOnce.current = true;
      } catch {
        if (!cancelled) {
          setLoadFailed(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setIsRefreshingOrders(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [venueId, isManager, selectedDate, retryCount, supportingDataRef, setOrders]);

  const retry = () => {
    hasLoadedOnce.current = false;
    setRetryCount((count) => count + 1);
  };

  return {
    isLoading,
    isRefreshingOrders,
    loadFailed,
    retry,
  };
}
