import { apiRequest } from "@/modules/shared/api";
import type { ContinueResponse, CurrentUser, PasswordProfile } from "./types";

export async function continueWithPassword(params: {
  email: string;
  password: string;
  profile?: PasswordProfile;
}): Promise<ContinueResponse> {
  return apiRequest<ContinueResponse>("/api/v1/auth/continue", {
    method: "POST",
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

export async function getCurrentUser(): Promise<CurrentUser> {
  return apiRequest<CurrentUser>("/api/v1/auth/me");
}
