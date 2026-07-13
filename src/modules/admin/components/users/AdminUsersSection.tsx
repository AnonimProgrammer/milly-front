"use client";

import { useEffect, useState } from "react";
import { inputField, textMuted } from "@/modules/shared/theme/classNames";
import type { AdminUser, PaginationMeta } from "../../api/types";
import {
  adminUserFilterEmptyMessage,
  type AdminUserListFilter,
  type AdminUserSearchFilters,
} from "../../utils/userFilters";
import { AdminUserFilterTabs } from "./AdminUserFilterTabs";
import { AdminUsersList } from "./AdminUsersList";
import { AdminUsersPagination } from "./AdminUsersPagination";
import { EditAdminUserModal } from "./EditAdminUserModal";

type AdminUsersSectionProps = {
  users: AdminUser[];
  pagination: PaginationMeta;
  filter: AdminUserListFilter;
  search: AdminUserSearchFilters;
  isRefreshing: boolean;
  refreshFailed: boolean;
  onFilterChange: (filter: AdminUserListFilter) => void;
  onSearchChange: (search: AdminUserSearchFilters) => void;
  onSearchSubmit: () => void;
  onUsersChanged: () => void;
  onRetryRefresh: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export function AdminUsersSection({
  users,
  pagination,
  filter,
  search,
  isRefreshing,
  refreshFailed,
  onFilterChange,
  onSearchChange,
  onSearchSubmit,
  onUsersChanged,
  onRetryRefresh,
  onPreviousPage,
  onNextPage,
}: AdminUsersSectionProps) {
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const emptyMessage = adminUserFilterEmptyMessage(filter);

  useEffect(() => {
    if (editingUser && !users.some((user) => user.id === editingUser.id)) {
      setEditingUser(null);
    }
  }, [users, editingUser]);

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Users</h2>
        <p className={`mt-1 text-sm font-light ${textMuted}`}>
          Filter platform users, manage system roles, and update account status.
        </p>
      </div>

      <form
        className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          onSearchSubmit();
        }}
      >
        <input
          type="search"
          value={search.name}
          onChange={(event) => onSearchChange({ ...search, name: event.target.value })}
          placeholder="Name"
          className={inputField}
          aria-label="Filter by name"
        />
        <input
          type="search"
          value={search.email}
          onChange={(event) => onSearchChange({ ...search, email: event.target.value })}
          placeholder="Email"
          className={inputField}
          aria-label="Filter by email"
        />
        <input
          type="search"
          value={search.phoneNumber}
          onChange={(event) =>
            onSearchChange({ ...search, phoneNumber: event.target.value })
          }
          placeholder="Phone"
          className={inputField}
          aria-label="Filter by phone"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Search
        </button>
      </form>

      <AdminUserFilterTabs
        filter={filter}
        userCount={users.length}
        isRefreshing={isRefreshing}
        onFilterChange={onFilterChange}
      />

      {refreshFailed ? (
        <div className="rounded-2xl border border-border bg-card/60 px-4 py-3">
          <p className={`text-sm ${textMuted}`}>Could not refresh users.</p>
          <button
            type="button"
            onClick={onRetryRefresh}
            className="mt-2 text-sm font-medium text-foreground underline"
          >
            Retry
          </button>
        </div>
      ) : null}

      <AdminUsersList
        users={users}
        isRefreshing={isRefreshing}
        emptyMessage={emptyMessage}
        onEdit={setEditingUser}
      />

      <AdminUsersPagination
        pagination={pagination}
        isRefreshing={isRefreshing}
        onPrevious={onPreviousPage}
        onNext={onNextPage}
      />

      {editingUser ? (
        <EditAdminUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSaved={onUsersChanged}
        />
      ) : null}
    </div>
  );
}
