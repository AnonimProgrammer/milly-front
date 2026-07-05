import { showErrorToast } from "../feedback/toast";
import { endApiRequest, startApiRequest } from "./apiActivity";
import { getApiBaseUrl } from "./config";
import { getSessionHandlers } from "./sessionHandlers";
import {
  ApiError,
  NetworkError,
  getRequestErrorMessage,
  type ApiResponse,
} from "./types";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  /** Skip automatic error toast (e.g. auth bootstrap, handled forbidden states). */
  silent?: boolean;
};

function notifyRequestError(error: unknown, silent?: boolean): void {
  if (silent) {
    return;
  }

  if (error instanceof ApiError && error.status === 401) {
    return;
  }

  const message = getRequestErrorMessage(error);

  showErrorToast(message);
}

async function withApiActivity<T>(fn: () => Promise<T>, silent?: boolean): Promise<T> {
  startApiRequest();
  try {
    return await fn();
  } catch (error) {
    notifyRequestError(error, silent);
    throw error;
  } finally {
    endApiRequest();
  }
}

const SKIP_REFRESH_PATHS = ["/api/v1/auth/continue", "/api/v1/auth/refresh", "/api/v1/auth/logout"];

function shouldAttemptRefresh(path: string, isRetry: boolean): boolean {
  if (isRetry) {
    return false;
  }

  return !SKIP_REFRESH_PATHS.some((skipPath) => path.startsWith(skipPath));
}

async function fetchApi(path: string, init: RequestInit): Promise<Response> {
  const url = `${getApiBaseUrl()}${path}`;

  try {
    return await fetch(url, init);
  } catch {
    throw new NetworkError();
  }
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  try {
    return (await response.json()) as ApiResponse<T>;
  } catch {
    if (response.status >= 500) {
      throw new ApiError(response.status, "The server is temporarily unavailable.");
    }

    throw new ApiError(response.status, "Unexpected response from server.");
  }
}

function createApiError(status: number, message?: string, errorCode?: string): ApiError {
  if (status >= 500) {
    return new ApiError(status, message ?? "The server is temporarily unavailable.", errorCode);
  }

  return new ApiError(status, message ?? "Request failed.", errorCode);
}

async function executeRequest<T>(
  path: string,
  options: RequestOptions,
  isRetry: boolean,
): Promise<T> {
  const { body, headers, ...rest } = options;
  const response = await fetchApi(path, {
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

  throw createApiError(response.status, payload.message, payload.errorCode);
}

async function executeNoContentRequest(
  path: string,
  options: RequestOptions,
  isRetry: boolean,
): Promise<void> {
  const { body, headers, ...rest } = options;
  const response = await fetchApi(path, {
    ...rest,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204 || response.ok) {
    return;
  }

  const payload = await parseResponse<null>(response);

  if (response.status === 401 && shouldAttemptRefresh(path, isRetry)) {
    const { refreshSession, onSessionExpired } = getSessionHandlers();
    const refreshed = (await refreshSession?.()) ?? false;

    if (refreshed) {
      return executeNoContentRequest(path, options, true);
    }

    onSessionExpired?.();
  }

  throw createApiError(response.status, payload.message, payload.errorCode);
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { silent, ...requestOptions } = options;
  return withApiActivity(() => executeRequest<T>(path, requestOptions, false), silent);
}

export async function apiRequestNoContent(
  path: string,
  options: RequestOptions = {},
): Promise<void> {
  const { silent, ...requestOptions } = options;
  return withApiActivity(
    () => executeNoContentRequest(path, requestOptions, false),
    silent,
  );
}
