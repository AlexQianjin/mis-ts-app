# MIS TypeScript Monorepo

A pnpm workspace containing a React frontend, a NestJS backend, and reusable TypeScript
packages.

## Requirements

- Node.js 24 or newer
- pnpm 11
- PostgreSQL 17 (or Docker)

## Getting started

```bash
cp .env.example .env
docker compose up -d postgres
pnpm install
pnpm dev
```

The web app runs at `http://localhost:5173` and proxies `/api` requests to the NestJS API
at `http://localhost:3000`.

Authentication is served by Better Auth at `/api/auth`. The API connects using `DATABASE_URL` and
creates or migrates its PostgreSQL tables on startup. Set `BETTER_AUTH_SECRET` to a high-entropy
value of at least 32 characters; the value in `.env.example` is only a placeholder.

To create the first account in a development environment, use Better Auth's email sign-up
endpoint, then sign in at `http://localhost:5173/login`:

```bash
curl -X POST http://localhost:5173/api/auth/sign-up/email \
  -H 'Content-Type: application/json' \
  -d '{"name":"Admin","email":"admin@example.com","password":"change-this-password"}'
```

The `/api/me` endpoint is protected and returns the current user when a valid Better Auth session
cookie is present. `/api/health` remains public.

## Commands

```bash
pnpm build
pnpm dev
pnpm lint
pnpm test
pnpm typecheck
pnpm format
```

## Workspace layout

- `apps/web` — React + Vite frontend
- `apps/api` — NestJS backend
- `packages/shared-types` — shared DTOs and interfaces
- `packages/api-client` — typed API client
- `packages/ui` — reusable React components
- `packages/eslint-config` — shared ESLint flat config
- `packages/tsconfig` — shared TypeScript configs
- `docker` — production Dockerfiles and nginx config
