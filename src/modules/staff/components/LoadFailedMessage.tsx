"use client";

import { ServiceUnavailable } from "@/modules/shared/ui/ServiceUnavailable";

type LoadFailedMessageProps = {
  onRetry?: () => void;
};

export function LoadFailedMessage({ onRetry }: LoadFailedMessageProps) {
  return (
    <ServiceUnavailable
      title="Couldn't load data"
      message="Failed to retrieve data. Please try again."
      onRetry={onRetry}
    />
  );
}
