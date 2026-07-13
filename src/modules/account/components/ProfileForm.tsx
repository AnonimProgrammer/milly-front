"use client";

import type { CurrentUser, UpdateCurrentUserRequest } from "@/modules/auth/api/types";
import { inputField, primaryButton, textMuted } from "@/modules/shared/theme/classNames";
import { useProfileForm } from "../hooks/useProfileForm";

type ProfileFormProps = {
  user: CurrentUser;
  updateProfile: (request: UpdateCurrentUserRequest) => Promise<CurrentUser>;
};

export function ProfileForm({ user, updateProfile }: ProfileFormProps) {
  const { values, error, isSaving, hasChanges, setField, handleSubmit } = useProfileForm({
    user,
    updateProfile,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="profile-first-name" className={`text-xs font-medium ${textMuted}`}>
            First name
          </label>
          <input
            id="profile-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={100}
            required
            value={values.firstName}
            onChange={(event) => setField("firstName", event.target.value)}
            disabled={isSaving}
            className={inputField}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="profile-last-name" className={`text-xs font-medium ${textMuted}`}>
            Last name
          </label>
          <input
            id="profile-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            maxLength={100}
            required
            value={values.lastName}
            onChange={(event) => setField("lastName", event.target.value)}
            disabled={isSaving}
            className={inputField}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="profile-email" className={`text-xs font-medium ${textMuted}`}>
          Email
        </label>
        <input
          id="profile-email"
          name="email"
          type="email"
          value={user.email}
          disabled
          className={inputField}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="profile-phone" className={`text-xs font-medium ${textMuted}`}>
          Phone number
        </label>
        <input
          id="profile-phone"
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
          maxLength={50}
          value={values.phoneNumber}
          onChange={(event) => setField("phoneNumber", event.target.value)}
          placeholder="+994551234567"
          disabled={isSaving}
          className={inputField}
        />
        <p className={`text-xs font-light ${textMuted}`}>
          Optional. Use international format, for example +994551234567.
        </p>
      </div>

      {error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSaving || !hasChanges}
        className={`mt-1 w-full rounded-xl px-4 py-3 text-sm font-medium sm:w-auto sm:self-end ${primaryButton}`}
      >
        {isSaving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
