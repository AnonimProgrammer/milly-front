# Development Instructions

---

## Summary

Day-to-day work on **milly-front**: layout conventions, where to put code, auth/proxy behaviour, and git rules. Setup: [installation.md](./installation.md). Routes: [routes.md](./routes.md).

---

## Table of contents

1. [Daily loop](#daily-loop)
2. [Layout rules](#layout-rules)
3. [Adding a feature](#adding-a-feature)
4. [API and session behaviour](#api-and-session-behaviour)
5. [Git conventions](#git-conventions)
6. [Commands](#commands)

---

## Daily loop

```bash
# Terminal A — Milly API (Postgres + Spring Boot)
# Terminal B — this app
npm run dev
```

Keep `.env.local` in sync with the backend port and WS URL.

---

## Layout rules

| Area | Path | Contains |
|------|------|----------|
| Routes | `src/app/...` | `page.tsx`, `layout.tsx`, loading/error — thin |
| Features | `src/modules/{name}/` | `api/`, `components/`, `hooks/`, `ws/` as needed |
| Cross-cutting | `src/modules/shared/` | HTTP client, WS helpers, UI kit, theme, feedback |
| Edge proxy | `src/proxy.ts` | `/api/v1` rewrite + cookie gate for protected matchers |

Do not put business API logic only inside `app/` pages; import from modules.

Styling: Tailwind utility classes; shared controls in `modules/shared/ui`. See [system-design.md](./system-design.md#ui-styling) for why Tailwind is used instead of a heavier CSS framework.

Module names used today: `account`, `admin`, `auth`, `billing`, `chatbot`, `customer`, `menu`, `orders`, `shared`, `staff`, `tables`, `venue`.

---

## Adding a feature

1. Prefer an existing module that owns the domain.
2. Add REST helpers under `modules/.../api` using `shared/api` (`credentials: "include"`).
3. Add UI under `components`; wire a thin page in `src/app`.
4. For realtime: extend or add a STOMP client under `ws/`; reuse `shared/ws` URL builders.
5. If the route must require login, add it to proxy `matcher` / `isProtectedRoute` and a client `Require*` guard as needed.
6. Align request/response shapes with the API (`ApiResponse` envelope).

Staff pages that need a role should not rely on UI alone — backend enforces venue membership; use membership context to hide controls.

---

## API and session behaviour

- Default: browser calls `/api/v1/...`; `proxy.ts` rewrites to `API_URL` and forwards only `access-token` and `refresh-token`.
- `AuthProvider` loads `GET /api/v1/auth/me` on boot.
- On **401**, the shared client refreshes once (`POST /api/v1/auth/refresh`) and retries.
- Inactive account (**403** with inactive error) clears the session client-side.

WebSocket cannot use that HTTP rewrite: set `NEXT_PUBLIC_WS_URL` when REST is proxied.

---

## Git conventions

**Branch:** `{type}/{feature-title}` or `{type}/{module-name}/{feature-title}`  
**Types:** `feat`, `fix`, `refactor`, `docs` — lowercase kebab-case.

**Commit:** `{type}: {Title}`

Examples: `feat: Staff members invite modal`, `docs: Add frontend system design`.

Repo also enforces PR commit size checks (see `.github/workflows`).

---

## Commands

```bash
npm run dev    # local development
npm run lint   # ESLint
npm run build  # production build
npm start      # serve production build
```

No dedicated test script in `package.json` today.

More: [build-instructions.md](./build-instructions.md), [chatbot.md](./chatbot.md), [system-design.md](./system-design.md).
