type StaffPortalPageProps = {
  venueId: string;
};

export function StaffPortalPage({ venueId }: StaffPortalPageProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Staff portal — {venueId}
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Venue-scoped dashboard — to be implemented.
      </p>
    </main>
  );
}
