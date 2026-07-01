import { refreshSession } from "./authApi";

let refreshInFlight: Promise<boolean> | null = null;

export async function attemptRefreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        await refreshSession();
        return true;
      } catch {
        return false;
      } finally {
        refreshInFlight = null;
      }
    })();
  }

  return refreshInFlight;
}
