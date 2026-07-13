"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/modules/auth";
import { primaryButton, textMuted } from "@/modules/shared/theme/classNames";
import { useVenueMembership } from "@/modules/venue";
import type { VenueMember } from "../../types/members";
import { canEditMember } from "../../utils/memberPermissions";
import {
  memberFilterEmptyMessage,
  memberFilterShowsStatus,
  type MemberListFilter,
} from "../../utils/memberFilters";
import { EditMemberModal } from "./EditMemberModal";
import { InviteMemberModal } from "./InviteMemberModal";
import { MemberFilterTabs } from "./MemberFilterTabs";
import { MembersList } from "./MembersList";
import { MembersRefreshError } from "./MembersRefreshError";

type MembersSectionProps = {
  venueId: string;
  members: VenueMember[];
  filter: MemberListFilter;
  isRefreshing: boolean;
  refreshFailed: boolean;
  onFilterChange: (filter: MemberListFilter) => void;
  onMembersChanged: () => void;
  onRetryRefresh: () => void;
};

export function MembersSection({
  venueId,
  members,
  filter,
  isRefreshing,
  refreshFailed,
  onFilterChange,
  onMembersChanged,
  onRetryRefresh,
}: MembersSectionProps) {
  const { user } = useAuth();
  const membership = useVenueMembership();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<VenueMember | null>(null);
  const viewerEmail = user?.email ?? "";
  const showStatus = memberFilterShowsStatus(filter);
  const emptyMessage = memberFilterEmptyMessage(filter);

  useEffect(() => {
    if (editingMember && !members.some((member) => member.id === editingMember.id)) {
      setEditingMember(null);
    }
  }, [members, editingMember]);

  const canEdit = (member: VenueMember) =>
    canEditMember(membership.role, member, viewerEmail);

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Members</h2>
          <p className={`mt-1 text-sm font-light ${textMuted}`}>
            View venue staff, roles, and invite new team members.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className={`cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium ${primaryButton}`}
        >
          Invite
        </button>
      </div>

      <MemberFilterTabs
        filter={filter}
        memberCount={members.length}
        isRefreshing={isRefreshing}
        onFilterChange={onFilterChange}
      />

      {refreshFailed ? <MembersRefreshError onRetry={onRetryRefresh} /> : null}

      <MembersList
        members={members}
        isRefreshing={isRefreshing}
        emptyMessage={emptyMessage}
        showStatus={showStatus}
        canEdit={canEdit}
        onEdit={setEditingMember}
      />

      {inviteOpen ? (
        <InviteMemberModal venueId={venueId} onClose={() => setInviteOpen(false)} />
      ) : null}

      {editingMember ? (
        <EditMemberModal
          venueId={venueId}
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSaved={onMembersChanged}
        />
      ) : null}
    </div>
  );
}
