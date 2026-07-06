import type { VenueMember } from "../types/members";

export const MOCK_VENUE_MEMBERS: VenueMember[] = [
  {
    id: "mem-001",
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@example.com",
    role: "MANAGER",
    status: "active",
  },
  {
    id: "mem-002",
    firstName: "Sam",
    lastName: "Chen",
    email: "sam.chen@example.com",
    role: "WAITER",
    status: "active",
  },
  {
    id: "mem-003",
    firstName: "Jordan",
    lastName: "Lee",
    email: "jordan.lee@example.com",
    role: "WAITER",
    status: "active",
  },
  {
    id: "mem-004",
    firstName: "Taylor",
    lastName: "Brooks",
    email: "taylor.brooks@example.com",
    role: "WAITER",
    status: "invited",
  },
  {
    id: "mem-005",
    firstName: "Morgan",
    lastName: "Patel",
    email: "morgan.patel@example.com",
    role: "WAITER",
    status: "inactive",
  },
];
