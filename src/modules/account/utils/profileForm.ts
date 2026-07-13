import type { CurrentUser, UpdateCurrentUserRequest } from "@/modules/auth/api/types";

export const PHONE_PATTERN = /^$|^\+?[1-9]\d{1,14}$/;

export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export function profileValuesFromUser(user: CurrentUser): ProfileFormValues {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber ?? "",
  };
}

export function validateProfileForm(values: ProfileFormValues): string | null {
  if (!values.firstName.trim()) {
    return "First name must not be blank.";
  }

  if (!values.lastName.trim()) {
    return "Last name must not be blank.";
  }

  if (!PHONE_PATTERN.test(values.phoneNumber.trim())) {
    return "Phone number must be a valid international number.";
  }

  return null;
}

export function buildProfileUpdateRequest(
  user: CurrentUser,
  values: ProfileFormValues,
): UpdateCurrentUserRequest | null {
  const firstName = values.firstName.trim();
  const lastName = values.lastName.trim();
  const phoneNumber = values.phoneNumber.trim();
  const currentPhone = user.phoneNumber ?? "";

  const request: UpdateCurrentUserRequest = {};

  if (firstName !== user.firstName) {
    request.firstName = firstName;
  }
  if (lastName !== user.lastName) {
    request.lastName = lastName;
  }
  if (phoneNumber !== currentPhone) {
    request.phoneNumber = phoneNumber;
  }

  return Object.keys(request).length > 0 ? request : null;
}

export function profileFormHasChanges(user: CurrentUser, values: ProfileFormValues): boolean {
  return buildProfileUpdateRequest(user, values) !== null;
}
