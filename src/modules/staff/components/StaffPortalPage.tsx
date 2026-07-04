"use client";

import { useState, useEffect } from "react";
import { StaffHeader } from "./StaffHeader";
import { StaffTabNav } from "./StaffTabNav";
import { OrdersSection } from "./sections/OrdersSection";
import { QRSection } from "./sections/QRSection";
import { MenuSection } from "./sections/MenuSection";
import { TablesSection } from "./sections/TablesSection";

type StaffPortalPageProps = {
  venueId: string;
};

export type OrderStatus = "pending" | "approved" | "completed";

export type OrderItem = {
  name: string;
  quantity: number;
};

export type Order = {
  id: string;
  table: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
};

export function StaffPortalPage({ venueId }: StaffPortalPageProps) {
  // 1. Role switcher state (MANAGER / WAITER)
  const [role, setRole] = useState<"MANAGER" | "WAITER">("MANAGER");
  
  // 2. Active Tab state
  const [activeTab, setActiveTab] = useState<"orders" | "qr" | "menu" | "tables">("orders");

  // 3. Tables state
  const [tables, setTables] = useState<string[]>([
    "Table 1",
    "Table 2",
    "Table 3",
    "Table 4",
    "Table 5",
    "Table 6",
    "Table 7",
    "Table 8"
  ]);

  // 4. Mock Menu Items state (using Azerbaijani Manat ₼ to match screenshots)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Margherita Pizza",
      description: "Tomato, mozzarella, basil",
      category: "Mains",
      price: 18.00
    },
    {
      id: "2",
      name: "Pepperoni Pizza",
      description: "Tomato, mozzarella, pepperoni",
      category: "Mains",
      price: 22.00
    },
    {
      id: "3",
      name: "Caesar Salad",
      description: "Romaine, parmesan, croutons, caesar dressing",
      category: "Starters",
      price: 12.00
    },
    {
      id: "4",
      name: "Cola",
      description: "330ml",
      category: "Drinks",
      price: 4.00
    },
    {
      id: "5",
      name: "Sparkling Water",
      description: "500ml",
      category: "Drinks",
      price: 3.00
    },
    {
      id: "6",
      name: "Tiramisu",
      description: "Classic Italian dessert",
      category: "Desserts",
      price: 9.00
    }
  ]);

  // 5. Mock Orders state
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ord-101",
      table: "Table 3",
      items: [
        { name: "Margherita Pizza", quantity: 2 },
        { name: "Cola", quantity: 1 }
      ],
      total: 40.00,
      status: "pending",
      createdAt: new Date(Date.now() - 5 * 60 * 1000) // 5m ago
    },
    {
      id: "ord-102",
      table: "Table 1",
      items: [
        { name: "Caesar Salad", quantity: 1 },
        { name: "Sparkling Water", quantity: 2 }
      ],
      total: 18.00,
      status: "approved",
      createdAt: new Date(Date.now() - 15 * 60 * 1000) // 15m ago
    },
    {
      id: "ord-103",
      table: "Table 5",
      items: [
        { name: "Pepperoni Pizza", quantity: 1 },
        { name: "Tiramisu", quantity: 1 },
        { name: "Cola", quantity: 2 }
      ],
      total: 39.00,
      status: "completed",
      createdAt: new Date(Date.now() - 45 * 60 * 1000) // 45m ago
    }
  ]);

  // Force active tab to orders if WAITER role is selected
  const handleRoleChange = (newRole: "MANAGER" | "WAITER") => {
    setRole(newRole);
    if (newRole === "WAITER") {
      setActiveTab("orders");
    }
  };

  // Capitalize venueId for user-friendly display in header
  const venueDisplayName = venueId.charAt(0).toUpperCase() + venueId.slice(1);

  // Render correct active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersSection />;
      case "qr":
        return <QRSection />;
      case "menu":
        return <MenuSection />;
      case "tables":
        return <TablesSection />;
      default:
        return <OrdersSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased flex flex-col">
      {/* Header */}
      <StaffHeader venueName={venueDisplayName} role={role} />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
        {/* Navigation Tabs */}
        <StaffTabNav activeTab={activeTab} setActiveTab={setActiveTab} role={role} />

        {/* Tab Content Panel */}
        <div className="flex-1 bg-white">
          {renderTabContent()}
        </div>
      </main>

      {/* Floating Developer Switcher Badge (Dev-only toggle as requested) */}
      <div className="fixed bottom-4 right-4 bg-white border border-zinc-200 shadow-xl rounded-2xl p-4 z-50 flex flex-col gap-2">
        <span className="text-[10px] tracking-wider font-semibold text-zinc-400 uppercase">
          Dev Role Switcher
        </span>
        <div className="flex bg-zinc-100 p-1 rounded-xl">
          <button
            onClick={() => handleRoleChange("MANAGER")}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              role === "MANAGER"
                ? "bg-black text-white shadow-sm"
                : "text-zinc-600 hover:text-black"
            }`}
          >
            Manager
          </button>
          <button
            onClick={() => handleRoleChange("WAITER")}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              role === "WAITER"
                ? "bg-black text-white shadow-sm"
                : "text-zinc-600 hover:text-black"
            }`}
          >
            Waiter
          </button>
        </div>
      </div>
    </div>
  );
}
