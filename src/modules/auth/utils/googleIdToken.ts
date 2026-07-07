import type { PasswordProfile } from "../api/types";

type GoogleIdTokenPayload = {
  given_name?: string;
  family_name?: string;
  name?: string;
  email?: string;
};

export function getGoogleClientId(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ?? "";
}

export function parseGoogleIdToken(idToken: string): PasswordProfile {
  const [, payloadSegment] = idToken.split(".");

  if (!payloadSegment) {
    throw new Error("Invalid Google identity token.");
  }

  const payload = JSON.parse(
    atob(payloadSegment.replace(/-/g, "+").replace(/_/g, "/")),
  ) as GoogleIdTokenPayload;

  const email = payload.email?.trim() ?? "";
  const firstName = payload.given_name?.trim() ?? payload.name?.split(" ")[0]?.trim() ?? "";
  const lastName = payload.family_name?.trim() ?? "";

  if (!email || !firstName || !lastName) {
    throw new Error("Google account is missing required profile information.");
  }

  return { firstName, lastName, email };
}
