"use client";

import { textMuted } from "@/modules/shared/theme/classNames";
import type { AdminUser } from "../../api/types";
import { AdminUserListItem } from "./AdminUserListItem";

type AdminUsersListProps = {
  users: AdminUser[];
  isRefreshing: boolean;
  emptyMessage: string;
  onEdit: (user: AdminUser) => void;
};

export function AdminUsersList({
  users,
  isRefreshing,
  emptyMessage,
  onEdit,
}: AdminUsersListProps) {
  if (users.length === 0) {
    return (
      <p className={`py-10 text-center text-sm font-light ${textMuted}`}>
        {isRefreshing ? "Loading users..." : emptyMessage}
      </p>
    );
  }

  return (
    <ul className={`flex flex-col gap-3 ${isRefreshing ? "opacity-70" : ""}`}>
      {users.map((user) => (
        <li key={user.id}>
          <AdminUserListItem user={user} onEdit={() => onEdit(user)} />
        </li>
      ))}
    </ul>
  );
}
