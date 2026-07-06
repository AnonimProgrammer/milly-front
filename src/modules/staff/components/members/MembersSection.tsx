"use client";

import { useState } from "react";
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
          <h2 className="text-xl font-bold tracking-tight text-black">Members</h2>
          <p className="mt-1 text-sm font-light text-zinc-500">
            View venue staff, roles, and invite new team members.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className="cursor-pointer rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Invite
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-black/[0.02] p-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-black">
                {member.firstName} {member.lastName}
              </p>
              <p className="mt-0.5 truncate text-xs text-zinc-500">{member.email}</p>
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
