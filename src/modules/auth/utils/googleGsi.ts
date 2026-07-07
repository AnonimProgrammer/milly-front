type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleIdentity = {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }) => void;
  renderButton: (parent: HTMLElement, options: Record<string, string>) => void;
};

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: GoogleIdentity;
      };
    };
  }
}

type CredentialCallback = (credential: string) => void;

let scriptLoadPromise: Promise<void> | null = null;
let identityInitialized = false;
let latestCredentialCallback: CredentialCallback | null = null;

function loadGoogleGsiScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google sign-in."));
    document.body.appendChild(script);
  });

  return scriptLoadPromise;
}

export function setGoogleCredentialCallback(callback: CredentialCallback | null): void {
  latestCredentialCallback = callback;
}

export async function ensureGoogleIdentityInitialized(clientId: string): Promise<void> {
  await loadGoogleGsiScript();

  const googleIdentity = window.google?.accounts?.id;
  if (!googleIdentity) {
    throw new Error("Google sign-in is unavailable.");
  }

  if (identityInitialized) {
    return;
  }

  googleIdentity.initialize({
    client_id: clientId,
    callback: (response) => {
      if (response.credential && latestCredentialCallback) {
        latestCredentialCallback(response.credential);
      }
    },
  });

  identityInitialized = true;
}

export function renderGoogleSignInButton(container: HTMLElement): void {
  const googleIdentity = window.google?.accounts?.id;
  if (!googleIdentity) {
    return;
  }

  container.replaceChildren();
  googleIdentity.renderButton(container, {
    type: "standard",
    theme: "outline",
    size: "large",
  });
}
