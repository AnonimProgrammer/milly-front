type IntentBannerProps = {
  intent: string | null;
};

export function IntentBanner({ intent }: IntentBannerProps) {
  if (intent === "join-venue") {
    return (
      <div className="mb-6 inline-flex items-center gap-1.5 self-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        Joining Venue
      </div>
    );
  }

  if (intent === "register-venue") {
    return (
      <div className="mb-6 inline-flex items-center gap-1.5 self-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        Registering Venue
      </div>
    );
  }

  return null;
}
