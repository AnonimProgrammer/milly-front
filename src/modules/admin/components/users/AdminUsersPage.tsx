"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LoadFailedMessage, StaffPageLoading } from "@/modules/staff";
import { listAdminUsers } from "../../api/adminUsersApi";
import type { AdminUser, PaginationMeta } from "../../api/types";
import {
  adminUserFilterToParams,
  emptyAdminUserSearchFilters,
  type AdminUserListFilter,
  type AdminUserSearchFilters,
} from "../../utils/userFilters";
import { AdminUsersSection } from "./AdminUsersSection";

const PAGE_LIMIT = 20;

const emptyPagination: PaginationMeta = {
  nextCursor: null,
  previousCursor: null,
  hasNext: false,
  hasPrevious: false,
  limit: PAGE_LIMIT,
};

export function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(emptyPagination);
  const [filter, setFilter] = useState<AdminUserListFilter>("all");
  const [searchDraft, setSearchDraft] = useState<AdminUserSearchFilters>(
    emptyAdminUserSearchFilters,
  );
  const [appliedSearch, setAppliedSearch] = useState<AdminUserSearchFilters>(
    emptyAdminUserSearchFilters,
  );
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const hasLoadedOnce = useRef(false);

  const loadUsers = useCallback(
    async (options?: { clearList?: boolean; pageCursor?: string | undefined }) => {
      const isInitialLoad = !hasLoadedOnce.current;
      const pageCursor = options?.pageCursor;

      if (isInitialLoad) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
        if (options?.clearList) {
          setUsers([]);
        }
      }

      setLoadFailed(false);
      setRefreshFailed(false);

      try {
        const page = await listAdminUsers(
          adminUserFilterToParams(filter, appliedSearch, PAGE_LIMIT, pageCursor),
          { background: true },
        );
        setUsers(page.data);
        setPagination(page.pagination);
        setCursor(pageCursor);
        hasLoadedOnce.current = true;
      } catch {
        if (isInitialLoad) {
          setLoadFailed(true);
        } else {
          setRefreshFailed(true);
        }
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [filter, appliedSearch],
  );

  useEffect(() => {
    void loadUsers({ clearList: hasLoadedOnce.current, pageCursor: undefined });
  }, [loadUsers]);

  const handleFilterChange = (nextFilter: AdminUserListFilter) => {
    setCursor(undefined);
    setFilter(nextFilter);
  };

  const handleSearchSubmit = () => {
    setCursor(undefined);
    setAppliedSearch(searchDraft);
  };

  if (isLoading) {
    return <StaffPageLoading />;
  }

  if (loadFailed) {
    return <LoadFailedMessage onRetry={() => void loadUsers()} />;
  }

  return (
    <AdminUsersSection
      users={users}
      pagination={pagination}
      filter={filter}
      search={searchDraft}
      isRefreshing={isRefreshing}
      refreshFailed={refreshFailed}
      onFilterChange={handleFilterChange}
      onSearchChange={setSearchDraft}
      onSearchSubmit={handleSearchSubmit}
      onUsersChanged={() => void loadUsers({ pageCursor: cursor })}
      onRetryRefresh={() => void loadUsers({ pageCursor: cursor })}
      onPreviousPage={() => {
        if (pagination.previousCursor != null) {
          void loadUsers({ pageCursor: pagination.previousCursor ?? undefined });
        }
      }}
      onNextPage={() => {
        if (pagination.nextCursor != null) {
          void loadUsers({ pageCursor: pagination.nextCursor ?? undefined });
        }
      }}
    />
  );
}
