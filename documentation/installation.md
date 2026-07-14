# Installation

---

## Summary

Run **milly-front** locally against a running Milly API. Node.js + npm; no Docker image in this repo. Production is typically Vercel (`next build` / `next start`).

---

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Clone and install](#clone-and-install)
3. [Environment](#environment)
4. [Start with the API](#start-with-the-api)
5. [Verify](#verify)

---

## Prerequisites

| Tool | Notes |
|------|-------|
| Node.js | 20+ recommended (Next.js 16) |
| npm | Comes with Node |
| Milly API | Running Spring Boot API + Postgres on port 8080 (Compose or `bootRun`) |

---

## Clone and install

```bash
git clone https://github.com/AnonimProgrammer/milly-front.git
cd milly-front
npm install
cp .env.example .env.local
```

Edit `.env.local` (see below). Do not commit secrets.

---

## Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `API_URL` | For local proxy | Server-only rewrite target (default idea: `http://localhost:8080`) |
| `NEXT_PUBLIC_API_URL` | No | Leave empty to call same-origin `/api/v1` through the proxy |
| `NEXT_PUBLIC_WS_URL` | Yes when API is proxied | Backend WS origin, e.g. `ws://localhost:8080` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | For Google login | Google Identity Services client id |

Local recommendation:

```env
API_URL=http://localhost:8080
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_WS_URL=ws://localhost:8080
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

If `NEXT_PUBLIC_API_URL` points at the backend directly, cookies and CORS must match that origin; `NEXT_PUBLIC_WS_URL` can often be derived (`http` → `ws`).

Full variable notes also belong with day-to-day work in [development-instructions.md](./development-instructions.md). Production: [build-instructions.md](./build-instructions.md).

---

## Start with the API

1. Start the Milly API (Compose or `bootRun`) on port **8080**.
2. From this repo:

```bash
npm run dev
```

App: [http://localhost:3000](http://localhost:3000).

`npm run dev` uses `next dev --webpack`.

---

## Verify

| Check | Expect |
|-------|--------|
| Open `/` | Landing loads |
| Open `/login` | Auth forms render |
| Sign in / sign up with backend up | Cookies set; `/auth/me` succeeds via proxy |
| Staff or table flows | REST works; if live updates fail, confirm `NEXT_PUBLIC_WS_URL` |

Health of the API: `http://localhost:8080/actuator/health` (backend).
