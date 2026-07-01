export function getApiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL;

  if (base === undefined || base === "") {
    return "";
  }

  return base.replace(/\/$/, "");
}
