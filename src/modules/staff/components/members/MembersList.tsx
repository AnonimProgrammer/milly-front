"use client";

import { listRow, textMuted } from "@/modules/shared/theme/classNames";
import type { VenueMember } from "../../types/members";
import { MemberListItem } from "./MemberListItem";

type MembersListProps = {
  members: VenueMember[];
  isRefreshing: boolean;
  emptyMessage: string;
  showStatus: boolean;
  canEdit: (member: VenueMember) => boolean;
  onEdit: (member: VenueMember) => void;
};

export function MembersList({
  members,
  isRefreshing,
  emptyMessage,
  showStatus,
  canEdit,
  onEdit,
}: MembersListProps) {
  return (
    <div
      className={`flex flex-col gap-2.5 transition-opacity ${isRefreshing ? "opacity-60" : ""}`}
      aria-busy={isRefreshing}
    >
      {members.length === 0 ? (
        <div className={`p-8 text-center ${listRow}`}>
          <p className={`text-sm font-light ${textMuted}`}>
            {isRefreshing ? "Loading members..." : emptyMessage}
          </p>
        </div>
      ) : (
        members.map((member) => (
          <MemberListItem
            key={member.id}
            member={member}
            editable={canEdit(member)}
            showStatus={showStatus}
            onEdit={() => onEdit(member)}
          />
        ))
      )}
    </div>
  );
}
