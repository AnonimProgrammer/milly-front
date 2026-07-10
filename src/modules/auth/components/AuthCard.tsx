import type { ReactNode } from "react";
import { surfacePanel } from "@/modules/shared/theme/classNames";

type AuthCardProps = {
  children: ReactNode;
};

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className={`w-full max-w-md p-8 sm:p-10 shadow-2xl flex flex-col ${surfacePanel}`}>
      {children}
    </div>
  );
}
