import { redirect } from "next/navigation";
import { adminPath } from "@/modules/admin";

export default function AdminIndexRoute() {
  redirect(adminPath("users"));
}
