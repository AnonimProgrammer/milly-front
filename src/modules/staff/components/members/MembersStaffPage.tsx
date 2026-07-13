"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { listAllMembers } from "../../api/membersApi";
import type { VenueMember } from "../../types/members";
import { memberFilterToParams, type MemberListFilter } from "../../utils/memberFilters";
import { LoadFailedMessage } from "../LoadFailedMessage";
import { StaffPageLoading } from "../StaffPageLoading";
import { MembersSection } from "./MembersSection";

type MembersStaffPageProps = {
  venueId: string;
};

export function MembersStaffPage({ venueId }: MembersStaffPageProps) {
  const [members, setMembers] = useState<VenueMember[]>([]);
  const [filter, setFilter] = useState<MemberListFilter>("active");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    hasLoadedOnce.current = false;
  }, [venueId]);

  const loadMembers = useCallback(
    async (options?: { clearList?: boolean }) => {
      const isInitialLoad = !hasLoadedOnce.current;

      if (isInitialLoad) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
        if (options?.clearList) {
          setMembers([]);
        }
      }

      setLoadFailed(false);
      setRefreshFailed(false);

      try {
        const memberResponses = await listAllMembers(
          venueId,
          memberFilterToParams(filter),
          { background: true },
        );
        setMembers(memberResponses);
        hasLoadedOnce.current = true;
      } catch {
        if (isInitialLoad) {
          setLoadFailed(true);
        } else {
          setRefreshFailed(true);
        }
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [venueId, filter],
  );

  useEffect(() => {
    void loadMembers({ clearList: hasLoadedOnce.current });
  }, [loadMembers]);

  if (isLoading) {
    return <StaffPageLoading />;
  }

  if (loadFailed) {
    return <LoadFailedMessage onRetry={() => void loadMembers()} />;
  }

  return (
    <MembersSection
      venueId={venueId}
      members={members}
      filter={filter}
      isRefreshing={isRefreshing}
      refreshFailed={refreshFailed}
      onFilterChange={setFilter}
      onMembersChanged={() => void loadMembers()}
      onRetryRefresh={() => void loadMembers()}
    />
  );
}
