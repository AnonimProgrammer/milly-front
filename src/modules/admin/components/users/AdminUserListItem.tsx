"use client";

import { ChevronRight } from "lucide-react";
import { listRow, textMuted } from "@/modules/shared/theme/classNames";
import type { AdminUser } from "../../api/types";
import { AdminUserRoleBadge } from "./AdminUserRoleBadge";
import { AdminUserStatusBadge } from "./AdminUserStatusBadge";

type AdminUserListItemProps = {
  user: AdminUser;
  onEdit: () => void;
};

export function AdminUserListItem({ user, onEdit }: AdminUserListItemProps) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className={`flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-opacity hover:opacity-80 ${listRow}`}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">
          {user.firstName} {user.lastName}
        </p>
        <p className={`mt-0.5 truncate text-xs ${textMuted}`}>{user.email}</p>
        {user.phoneNumber ? (
          <p className={`mt-0.5 truncate text-xs ${textMuted}`}>{user.phoneNumber}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
        {user.roles.map((role) => (
          <AdminUserRoleBadge key={role} role={role} />
        ))}
        <AdminUserStatusBadge status={user.status} />
        <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </div>
    </button>
  );
}
