import { RequireAuth } from "@/modules/auth";
import { RegisterVenuePage } from "@/modules/venue";

export default function RegisterVenueRoute() {
  return (
    <RequireAuth>
      <RegisterVenuePage />
    </RequireAuth>
  );
}
