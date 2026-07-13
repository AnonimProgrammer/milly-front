"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import type { CurrentUser, UpdateCurrentUserRequest } from "@/modules/auth/api/types";
import { showToast } from "@/modules/shared/feedback";
import {
  buildProfileUpdateRequest,
  profileFormHasChanges,
  profileValuesFromUser,
  validateProfileForm,
  type ProfileFormValues,
} from "../utils/profileForm";

type UseProfileFormParams = {
  user: CurrentUser;
  updateProfile: (request: UpdateCurrentUserRequest) => Promise<CurrentUser>;
};

export function useProfileForm({ user, updateProfile }: UseProfileFormParams) {
  const [values, setValues] = useState<ProfileFormValues>(() => profileValuesFromUser(user));
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setValues(profileValuesFromUser(user));
    setError(null);
  }, [user]);

  const hasChanges = profileFormHasChanges(user, values);

  function setField<K extends keyof ProfileFormValues>(field: K, value: ProfileFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const validationError = validateProfileForm(values);
    if (validationError) {
      setError(validationError);
      return;
    }

    const request = buildProfileUpdateRequest(user, values);
    if (!request) {
      return;
    }

    setIsSaving(true);

    try {
      await updateProfile(request);
      showToast("Profile updated successfully.", "success");
    } catch {
      // Error toast is handled by the API client.
    } finally {
      setIsSaving(false);
    }
  }

  return {
    values,
    error,
    isSaving,
    hasChanges,
    setField,
    handleSubmit,
  };
}
