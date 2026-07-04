"use client";

type StaffTabNavProps = {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  role: "MANAGER" | "WAITER";
};

export function StaffTabNav({ activeTab, setActiveTab, role }: StaffTabNavProps) {
  return (
    <div className="py-2">
      <span className="text-sm text-zinc-500">Tabs placeholder</span>
    </div>
  );
}
