import { RequireAuth } from "@/modules/auth";
import { JoinVenuePage } from "@/modules/venue";

export default function JoinVenueRoute() {
  return (
    <RequireAuth>
      <JoinVenuePage />
    </RequireAuth>
  );
}
