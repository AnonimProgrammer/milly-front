"use client";

import { useMemo } from "react";
import { MOCK_VENUE_MEMBERS } from "../../mock/mockMembers";
import { MembersSection } from "./MembersSection";

type MembersStaffPageProps = {
  venueId: string;
};

export function MembersStaffPage({ venueId }: MembersStaffPageProps) {
  const members = useMemo(() => MOCK_VENUE_MEMBERS, []);

  return <MembersSection venueId={venueId} members={members} />;
}
