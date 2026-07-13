import type { ReactNode } from "react";
import { RequireAuth } from "@/modules/auth";
import { AdminLayout, RequireAdmin } from "@/modules/admin";

type AdminLayoutRouteProps = {
  children: ReactNode;
};

export default function AdminLayoutRoute({ children }: AdminLayoutRouteProps) {
  return (
    <RequireAuth loginIntent="admin">
      <RequireAdmin>
        <AdminLayout>{children}</AdminLayout>
      </RequireAdmin>
    </RequireAuth>
  );
}
