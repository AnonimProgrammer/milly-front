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
