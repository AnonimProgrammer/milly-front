type SessionHandlers = {
  refreshSession?: () => Promise<boolean>;
  onSessionExpired?: () => void;
};

let handlers: SessionHandlers = {};

export function setSessionHandlers(next: SessionHandlers): void {
  handlers = next;
}

export function clearSessionHandlers(): void {
  handlers = {};
}

export function getSessionHandlers(): SessionHandlers {
  return handlers;
}
