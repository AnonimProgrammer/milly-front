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
import type { VenueRole } from "@/modules/venue";
import { updateMember } from "../../api/membersApi";
import type { MemberStatus, VenueMember } from "../../types/members";

type EditMemberModalProps = {
  venueId: string;
  member: VenueMember;
  onClose: () => void;
  onSaved: () => void;
};

export function EditMemberModal({ venueId, member, onClose, onSaved }: EditMemberModalProps) {
  const [role, setRole] = useState<VenueRole>(member.role);
  const [status, setStatus] = useState<MemberStatus>(member.status);
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

  const hasChanges = role !== member.role || status !== member.status;

  const handleSave = async () => {
    if (!hasChanges) {
      onClose();
      return;
    }

    setIsSaving(true);

    try {
      const request: { role?: VenueRole; status?: MemberStatus } = {};
      if (role !== member.role) {
        request.role = role;
      }
      if (status !== member.status) {
        request.status = status;
      }

      await updateMember(venueId, member.id, request);
      showToast("Member updated successfully.", "success");
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
        aria-labelledby="edit-member-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="edit-member-title" className="text-xl font-bold text-foreground">
          Edit member
        </h3>
        <p className={`mt-2 text-sm font-light ${textMuted}`}>
          {member.firstName} {member.lastName} · {member.email}
        </p>
        <p className={`mt-1 text-xs ${textMuted}`}>
          Update role or block access for this team member.
        </p>

        <div className="mt-6 space-y-2">
          <label htmlFor="edit-member-role" className="text-sm font-medium text-foreground">
            Role
          </label>
          <select
            id="edit-member-role"
            value={role}
            onChange={(event) => setRole(event.target.value as VenueRole)}
            disabled={isSaving}
            className={inputField}
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
          </select>
        </div>

        <div className="mt-4 space-y-2">
          <label htmlFor="edit-member-status" className="text-sm font-medium text-foreground">
            Status
          </label>
          <select
            id="edit-member-status"
            value={status}
            onChange={(event) => setStatus(event.target.value as MemberStatus)}
            disabled={isSaving}
            className={inputField}
          >
            <option value="active">Active</option>
            <option value="inactive">Blocked</option>
          </select>
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
            onClick={handleSave}
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
