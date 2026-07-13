"use client";

import { useEffect, useState } from "react";
import { showToast } from "@/modules/shared/feedback";
import {
  inputField,
  modalOverlay,
  modalPanel,
  primaryButton,
  secondaryButton,
  textMuted,
} from "@/modules/shared/theme/classNames";
import { updateAdminUser } from "../../api/adminUsersApi";
import type { AdminUser, SystemRole, UserStatus } from "../../api/types";

type EditAdminUserModalProps = {
  user: AdminUser;
  onClose: () => void;
  onSaved: () => void;
};

export function EditAdminUserModal({ user, onClose, onSaved }: EditAdminUserModalProps) {
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [isAdmin, setIsAdmin] = useState(user.roles.includes("ADMIN"));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const nextRoles: SystemRole[] = isAdmin ? ["USER", "ADMIN"] : ["USER"];
  const currentIsAdmin = user.roles.includes("ADMIN");
  const hasChanges =
    status !== user.status || isAdmin !== currentIsAdmin;

  const handleSave = async () => {
    if (!hasChanges) {
      onClose();
      return;
    }

    setIsSaving(true);

    try {
      const request: { status?: UserStatus; roles?: SystemRole[] } = {};
      if (status !== user.status) {
        request.status = status;
      }
      if (isAdmin !== currentIsAdmin) {
        request.roles = nextRoles;
      }

      await updateAdminUser(user.id, request);
      showToast("User updated successfully.", "success");
      onSaved();
      onClose();
    } catch {
      // Error toast is handled by the API client.
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={modalOverlay} onClick={onClose} role="presentation">
      <div
        className={modalPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-admin-user-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="edit-admin-user-title" className="text-xl font-bold text-foreground">
          Manage user
        </h3>
        <p className={`mt-2 text-sm font-light ${textMuted}`}>
          {user.firstName} {user.lastName} · {user.email}
        </p>
        <p className={`mt-1 text-xs ${textMuted}`}>
          Update system role or account status. Changes apply to all admins, including other
          administrators.
        </p>

        <div className="mt-6 space-y-2">
          <label htmlFor="edit-admin-user-status" className="text-sm font-medium text-foreground">
            Status
          </label>
          <select
            id="edit-admin-user-status"
            value={status}
            onChange={(event) => setStatus(event.target.value as UserStatus)}
            disabled={isSaving}
            className={inputField}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(event) => setIsAdmin(event.target.checked)}
              disabled={isSaving}
              className="mt-1 h-4 w-4 accent-primary"
            />
            <span>
              <span className="block text-sm font-medium text-foreground">System admin</span>
              <span className={`mt-0.5 block text-xs ${textMuted}`}>
                Grants access to Admin Console and platform-wide user management.
              </span>
            </span>
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className={`flex-1 cursor-pointer rounded-xl px-4 py-3 text-sm font-medium active:scale-[0.99] ${secondaryButton}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={isSaving || !hasChanges}
            className={`flex-1 cursor-pointer rounded-xl px-4 py-3 text-sm font-medium ${primaryButton}`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
