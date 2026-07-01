import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
};

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md bg-white border border-black/10 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/10 flex flex-col">
      {children}
    </div>
  );
}
