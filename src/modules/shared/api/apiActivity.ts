type Listener = () => void;

let pendingCount = 0;
const listeners = new Set<Listener>();

export function subscribeApiActivity(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPendingRequestCount(): number {
  return pendingCount;
}

export function startApiRequest(): void {
  pendingCount += 1;
  listeners.forEach((listener) => listener());
}

export function endApiRequest(): void {
  pendingCount = Math.max(0, pendingCount - 1);
  listeners.forEach((listener) => listener());
}

/** Immediate UI feedback before an API call starts (e.g. route transition). */
export function startUiActivity(): void {
  startApiRequest();
}

export function endUiActivity(): void {
  endApiRequest();
}
