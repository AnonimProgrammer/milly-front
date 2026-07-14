# Build Instructions

---

## Summary

How to produce and run a production build of **milly-front**, and which environment variables matter for deploy (including Vercel-style hosting).

---

## Table of contents

1. [Build locally](#build-locally)
2. [Run the production server](#run-the-production-server)
3. [Deploy environment](#deploy-environment)
4. [Checklist](#checklist)

---

## Build locally

```bash
npm install
npm run build
```

`next build` compiles the App Router app. Failures are usually TypeScript or ESLint issues surfaced by the Next build.

Optional before release:

```bash
npm run lint
```

---

## Run the production server

After a successful build:

```bash
npm start
```

Default listen: port **3000** (`next start`). Override with `PORT` if the host requires it.

This is the same binary path used behind many Node hosts. Static export is **not** configured; the app expects a Node server (or Vercel’s Next runtime).

---

## Deploy environment

Set these on the host (example: Vercel project settings).

| Variable | Scope | Notes |
|----------|--------|------|
| `API_URL` | Server | API origin for `/api/v1` rewrite, e.g. `https://api.example.com` |
| `NEXT_PUBLIC_API_URL` | Client | Usually **empty** so the browser uses same-origin `/api/v1` and cookies stay first-party on the front domain |
| `NEXT_PUBLIC_WS_URL` | Client | API WS origin, e.g. `wss://api.example.com` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Client | Must match the Google OAuth client id configured on the API |

Important:

- Changing `NEXT_PUBLIC_*` requires a **rebuild**; values are inlined at build time.
- Backend must allow the front origin for CORS and cookie `SameSite` / `Secure` settings appropriate to HTTPS.
- Cookie names remain `access-token` and `refresh-token` (set by the API).

Live app reference: [https://milly-front.vercel.app](https://milly-front.vercel.app).

There is no Dockerfile in this repository; containerize with a Node image + `npm run build && npm start` if needed.

---

## Checklist

1. API reachable at `API_URL` with HTTPS in production.
2. `NEXT_PUBLIC_WS_URL` uses `wss://` and reaches `/ws`.
3. Google client id matches backend `GOOGLE_CLIENT_ID` audience when Google login is enabled.
4. Smoke-test: login, open a venue staff page, open a public `/table/{id}` page, confirm orders/WS/chat if used.
