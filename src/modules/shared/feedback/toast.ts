export type ToastType = "error" | "success";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type Listener = () => void;

let toasts: Toast[] = [];
const EMPTY_TOASTS: Toast[] = [];
const listeners = new Set<Listener>();
const dismissTimers = new Map<string, ReturnType<typeof setTimeout>>();

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getToasts(): Toast[] {
  return toasts;
}

export function getServerToasts(): Toast[] {
  return EMPTY_TOASTS;
}

export function showToast(message: string, type: ToastType = "error"): void {
  const id = crypto.randomUUID();
  toasts = [...toasts, { id, message, type }];
  notify();

  const timer = setTimeout(() => {
    dismissToast(id);
  }, 5000);
  dismissTimers.set(id, timer);
}

export function dismissToast(id: string): void {
  const timer = dismissTimers.get(id);
  if (timer) {
    clearTimeout(timer);
    dismissTimers.delete(id);
  }

  toasts = toasts.filter((toast) => toast.id !== id);
  notify();
}

export function showErrorToast(message: string): void {
  showToast(message, "error");
}
