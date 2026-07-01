import { getApiBaseUrl } from "./config";
import { getSessionHandlers } from "./sessionHandlers";
import { ApiError, type ApiResponse } from "./types";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

const SKIP_REFRESH_PATHS = ["/api/v1/auth/continue", "/api/v1/auth/refresh", "/api/v1/auth/logout"];

function shouldAttemptRefresh(path: string, isRetry: boolean): boolean {
  if (isRetry) {
    return false;
  }

  return !SKIP_REFRESH_PATHS.some((skipPath) => path.startsWith(skipPath));
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  return (await response.json()) as ApiResponse<T>;
}

async function executeRequest<T>(
  path: string,
  options: RequestOptions,
  isRetry: boolean,
): Promise<T> {
  const { body, headers, ...rest } = options;
  const url = `${getApiBaseUrl()}${path}`;

  const response = await fetch(url, {
    ...rest,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await parseResponse<T>(response);

  if (response.ok) {
    return payload.data;
  }

  if (response.status === 401 && shouldAttemptRefresh(path, isRetry)) {
    const { refreshSession, onSessionExpired } = getSessionHandlers();
    const refreshed = (await refreshSession?.()) ?? false;

    if (refreshed) {
      return executeRequest<T>(path, options, true);
    }

    onSessionExpired?.();
  }

  throw new ApiError(response.status, payload.message ?? "Request failed.", payload.errorCode);
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return executeRequest<T>(path, options, false);
}
