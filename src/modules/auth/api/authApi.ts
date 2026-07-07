import { apiRequest } from "@/modules/shared/api";
import type { ContinueResponse, CurrentUser, PasswordProfile } from "./types";

export async function continueWithPassword(params: {
  email: string;
  password: string;
  profile?: PasswordProfile;
}): Promise<ContinueResponse> {
  return apiRequest<ContinueResponse>("/api/v1/auth/continue", {
    method: "POST",
    silent: true,
    background: true,
    body: {
      provider: "PASSWORD",
      credentials: {
        email: params.email,
        password: params.password,
      },
      ...(params.profile ? { profile: params.profile } : {}),
    },
  });
}

export async function continueWithGoogle(params: {
  idToken: string;
  profile?: PasswordProfile;
}): Promise<ContinueResponse> {
  return apiRequest<ContinueResponse>("/api/v1/auth/continue", {
    method: "POST",
    silent: true,
    background: true,
    body: {
      provider: "GOOGLE",
      credentials: {
        idToken: params.idToken,
      },
      ...(params.profile ? { profile: params.profile } : {}),
    },
  });
}

export async function getCurrentUser(): Promise<CurrentUser> {
  return apiRequest<CurrentUser>("/api/v1/auth/me", { silent: true, background: true });
}

export async function refreshSession(): Promise<void> {
  await apiRequest<null>("/api/v1/auth/refresh", {
    method: "POST",
    silent: true,
    background: true,
  });
}

export async function logout(): Promise<void> {
  await apiRequest<null>("/api/v1/auth/logout", { method: "POST" });
}
