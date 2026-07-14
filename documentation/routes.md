# Route Documentation

---

## Summary

App Router map for **milly-front**: URL → page purpose → access control. Route files live under `src/app`. Feature UIs live under `src/modules`.

---

## Table of contents

1. [Access layers](#access-layers)
2. [Public routes](#public-routes)
3. [Authenticated onboarding](#authenticated-onboarding)
4. [Staff portal](#staff-portal)
5. [Admin](#admin)
6. [Settings](#settings)
7. [Proxy matcher](#proxy-matcher)

---

## Access layers

| Layer | Mechanism |
|-------|-----------|
| Edge | `src/proxy.ts` — redirect to `/login?intent=…` if `access-token` missing on matched paths |
| Client layout | `RequireAuth`, `RequireAdmin`, `RequireVenueMembership`, role helpers |
| Backend | JWT + venue membership / `ADMIN` — source of truth |

Login and signup are **not** blocked by the proxy (stale cookies must not trap users when the API is down).

---

## Public routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Landing — join / register entry |
| `/login` | `app/login/page.tsx` | Sign in (password, Google) |
| `/signup` | `app/signup/page.tsx` | Sign up |
| `/table/[tableId]` | `app/table/[tableId]/page.tsx` | Customer menu, orders, pay, chat |

Customer table route has **no** login requirement. Data is scoped by `tableId` on public API paths.

---

## Authenticated onboarding

| Route | Purpose |
|-------|---------|
| `/register-venue` | Create venue → caller becomes owner → staff portal |
| `/join-venue` | List memberships; start join |
| `/join-venue/invite/[token]` | Redeem invitation token |

Proxy requires `access-token`. Client also uses auth guards.

---

## Staff portal

Base: `/venue/[venueId]/staff` (layout: auth + venue membership).  
Index redirects to **orders**.

| Route | Module focus |
|-------|----------------|
| `/venue/[venueId]/staff/orders` | Order board |
| `/venue/[venueId]/staff/menu` | Menu CRUD (manager-level UI) |
| `/venue/[venueId]/staff/tables` | Tables + QR |
| `/venue/[venueId]/staff/members` | Members / invites (manager-level UI) |

Staff shell and tabs: `modules/staff`. Realtime: staff venue STOMP topic after WS ticket.

---

## Admin

| Route | Purpose |
|-------|---------|
| `/admin` | Redirects to `/admin/users` |
| `/admin/users` | Platform user list/edit |

Requires cookie (proxy) + system role `ADMIN` (`RequireAdmin`). Calls `/api/v1/admin/users`.

---

## Settings

| Route | Purpose |
|-------|---------|
| `/settings` | Account shell |
| `/settings/profile` | Profile form |

Uses `modules/account`. Not listed on the proxy matcher; treat as app shell and rely on client/API behaviour for authenticated actions.

---

## Proxy matcher

Paths that go through `proxy.ts` page gate / API rewrite config:

- `/api/v1/:path*` — rewrite to backend
- `/join-venue/:path*`, `/register-venue`
- `/venue/:venueId/staff/:path*`
- `/admin`, `/admin/:path*`

Related: [system-design.md](./system-design.md), [development-instructions.md](./development-instructions.md).
