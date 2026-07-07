import { RequireAuth } from "@/modules/auth";
import { JoinVenuePage } from "@/modules/venue";

type JoinVenueInviteRouteProps = {
  params: Promise<{ token: string }>;
};

export default async function JoinVenueInviteRoute({ params }: JoinVenueInviteRouteProps) {
  const { token } = await params;

  return (
    <RequireAuth loginIntent="join-venue">
      <JoinVenuePage inviteToken={token} />
    </RequireAuth>
  );
}
