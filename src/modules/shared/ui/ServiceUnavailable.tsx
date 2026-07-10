"use client";

import { BrandBackNav } from "./BrandBackNav";
import { PageHeader } from "./PageHeader";

type ServiceUnavailableProps = {
  code?: string;
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
};

export function ServiceUnavailable({
  code = "503",
  title = "Service unavailable",
  message = "We couldn't reach the server. Check your connection and try again.",
  onRetry,
  fullPage = false,
}: ServiceUnavailableProps) {
  const content = (
    <div className="flex flex-col items-center text-center">
      {fullPage ? (
        <p className="text-6xl font-light tracking-tight text-black dark:text-zinc-100 sm:text-7xl">{code}</p>
      ) : null}
      <h1
        className={
          fullPage
            ? "mt-4 text-xl font-semibold text-black dark:text-zinc-100 sm:text-2xl"
            : "text-xl font-semibold text-black dark:text-zinc-100 sm:text-2xl"
        }
      >
        {title}
      </h1>
      <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-zinc-500 dark:text-zinc-400">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-8 rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Try again
        </button>
      ) : null}
    </div>
  );

  if (fullPage) {
    return (
      <main className="relative flex min-h-screen flex-col overflow-hidden bg-white dark:bg-zinc-950 p-6 font-sans text-black dark:text-zinc-50 antialiased selection:bg-black selection:text-white">
        <PageHeader leading={<BrandBackNav href="/" />} />

        <div className="z-10 flex flex-1 flex-col items-center justify-center py-10">{content}</div>
      </main>
    );
  }

  return <div className="flex justify-center py-12">{content}</div>;
}
