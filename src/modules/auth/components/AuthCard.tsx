import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
};

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/10 dark:shadow-black/30 flex flex-col">
      {children}
    </div>
  );
}
