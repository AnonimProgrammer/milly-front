"use client";

import { useCallback, useEffect, useState } from "react";
import { listAllMembers } from "../../api/membersApi";
import type { VenueMember } from "../../types/members";
import { LoadFailedMessage } from "../LoadFailedMessage";
import { StaffPageLoading } from "../StaffPageLoading";
import { MembersSection } from "./MembersSection";

type MembersStaffPageProps = {
  venueId: string;
};

export function MembersStaffPage({ venueId }: MembersStaffPageProps) {
  const [members, setMembers] = useState<VenueMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadMembers = useCallback(async () => {
    setLoadFailed(false);
    setIsLoading(true);

    try {
      const memberResponses = await listAllMembers(venueId, undefined, { background: true });
      setMembers(memberResponses);
    } catch {
      setLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [venueId]);

  useEffect(() => {
    void loadMembers();
  }, [loadMembers]);

  if (isLoading) {
    return <StaffPageLoading />;
  }

  if (loadFailed) {
    return <LoadFailedMessage onRetry={() => void loadMembers()} />;
  }

  return <MembersSection venueId={venueId} members={members} />;
}
