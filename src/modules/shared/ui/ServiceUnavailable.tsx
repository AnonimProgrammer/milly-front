"use client";

type ServiceUnavailableProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
};

export function ServiceUnavailable({
  title = "Service unavailable",
  message = "We couldn't reach the server. Check your connection and try again.",
  onRetry,
  fullPage = false,
}: ServiceUnavailableProps) {
  const content = (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-400">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <p className="max-w-sm text-sm font-light text-zinc-500">{message}</p>
      </div>

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Try again
        </button>
      ) : null}
    </div>
  );

  if (fullPage) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
        {content}
      </main>
    );
  }

  return <div className="flex justify-center py-12">{content}</div>;
}
