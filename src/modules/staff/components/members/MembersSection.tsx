"use client";

import { useState } from "react";
import { listRow, primaryButton, textMuted } from "@/modules/shared/theme/classNames";
import type { VenueMember } from "../../types/members";
import { InviteMemberModal } from "./InviteMemberModal";
import { MemberRoleBadge } from "./MemberRoleBadge";
import { MemberStatusBadge } from "./MemberStatusBadge";

type MembersSectionProps = {
  venueId: string;
  members: VenueMember[];
};

export function MembersSection({ venueId, members }: MembersSectionProps) {
  const [inviteOpen, setInviteOpen] = useState(false);

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

      <div className="flex flex-col gap-2.5">
        {members.map((member) => (
          <div
            key={member.id}
            className={`flex items-center justify-between gap-4 p-4 ${listRow}`}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {member.firstName} {member.lastName}
              </p>
              <p className={`mt-0.5 truncate text-xs ${textMuted}`}>{member.email}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <MemberRoleBadge role={member.role} />
              <MemberStatusBadge status={member.status} />
            </div>
          </div>
        ))}
      </div>

      {inviteOpen ? (
        <InviteMemberModal venueId={venueId} onClose={() => setInviteOpen(false)} />
      ) : null}
    </div>
  );
}
