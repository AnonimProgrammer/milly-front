export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
  errorCode?: string;
  timestamp?: string;
};

export class ApiError extends Error {
  readonly status: number;
  readonly errorCode?: string;

  constructor(status: number, message: string, errorCode?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorCode = errorCode;
  }
}

export class NetworkError extends Error {
  constructor(message = "Unable to reach the server. Check your connection and try again.") {
    super(message);
    this.name = "NetworkError";
  }
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof NetworkError;
}

export function isServiceUnavailable(error: unknown): boolean {
  if (isNetworkError(error)) {
    return true;
  }

  return error instanceof ApiError && error.status >= 500;
}

export function isAccountInactiveError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 403 && error.errorCode === "ACCOUNT_INACTIVE";
}

export function getRequestErrorMessage(error: unknown): string {
  if (error instanceof ApiError || error instanceof NetworkError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to retrieve data.";
}
