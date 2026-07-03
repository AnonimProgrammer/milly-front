"use client";

type TabOption = {
  id: "orders" | "qr" | "menu" | "tables";
  label: string;
  managerOnly: boolean;
};

type StaffTabNavProps = {
  activeTab: "orders" | "qr" | "menu" | "tables";
  setActiveTab: (tab: "orders" | "qr" | "menu" | "tables") => void;
  role: "MANAGER" | "WAITER";
};

const tabs: TabOption[] = [
  { id: "orders", label: "Orders", managerOnly: false },
  { id: "qr", label: "QR codes", managerOnly: true },
  { id: "menu", label: "Menu", managerOnly: true },
  { id: "tables", label: "Tables", managerOnly: true },
];

export function StaffTabNav({ activeTab, setActiveTab, role }: StaffTabNavProps) {
  // Filter tabs: Waiter sees only non-managerOnly tabs (Orders)
  const visibleTabs = tabs.filter((tab) => !tab.managerOnly || role === "MANAGER");

  return (
    <div className="w-full border-b border-zinc-100 pb-4">
      <nav className="flex flex-wrap gap-2.5" aria-label="Staff Portal Tabs">
        {visibleTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-sm"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
