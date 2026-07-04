"use client";

type StaffHeaderProps = {
  venueName: string;
};

export function StaffHeader({ venueName }: StaffHeaderProps) {
  return (
    <header className="w-full border-b border-zinc-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-black">
            Milly
          </span>
          <span className="text-xs text-zinc-500 font-light">
            Staff ({venueName})
          </span>
        </div>

        <div>
          <button
            type="button"
            className="text-sm text-zinc-500 hover:text-black transition-colors font-light cursor-pointer"
            onClick={() => {
              // Sign out visual-only action
              alert("Sign out clicked (Visual mock only)");
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
