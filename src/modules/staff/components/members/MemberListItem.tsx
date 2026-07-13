"use client";

import { ChevronRight } from "lucide-react";
import { listRow, textMuted } from "@/modules/shared/theme/classNames";
import type { VenueMember } from "../../types/members";
import { MemberRoleBadge } from "./MemberRoleBadge";
import { MemberStatusBadge } from "./MemberStatusBadge";

type MemberListItemProps = {
  member: VenueMember;
  editable: boolean;
  showStatus: boolean;
  onEdit: () => void;
};

export function MemberListItem({ member, editable, showStatus, onEdit }: MemberListItemProps) {
  const details = (
    <>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">
          {member.firstName} {member.lastName}
        </p>
        <p className={`mt-0.5 truncate text-xs ${textMuted}`}>{member.email}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <MemberRoleBadge role={member.role} />
        {showStatus ? <MemberStatusBadge status={member.status} /> : null}
        {editable ? (
          <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        ) : null}
      </div>
    </>
  );

  if (editable) {
    return (
      <button
        type="button"
        onClick={onEdit}
        className={`flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-opacity hover:opacity-80 ${listRow}`}
      >
        {details}
      </button>
    );
  }

  return (
    <div className={`flex items-center justify-between gap-4 p-4 ${listRow}`}>
      {details}
    </div>
  );
}
