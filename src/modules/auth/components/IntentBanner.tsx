type IntentBannerProps = {
  intent: string | null;
};

export function IntentBanner({ intent }: IntentBannerProps) {
  if (intent === "join-venue") {
    return (
      <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-black bg-black/5 border border-black/10 self-center">
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        Joining Venue
      </div>
    );
  }

  if (intent === "register-venue") {
    return (
      <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-black bg-black/5 border border-black/10 self-center">
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        Registering Venue
      </div>
    );
  }

  return null;
}
