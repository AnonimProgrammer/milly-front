"use client";

import { ServiceUnavailable } from "@/modules/shared/ui/ServiceUnavailable";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <ServiceUnavailable
      fullPage
      title="Something went wrong"
      message={error.message || "An unexpected error occurred. Please try again."}
      onRetry={reset}
    />
  );
}
