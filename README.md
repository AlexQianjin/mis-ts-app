# MIS TypeScript Monorepo

A pnpm workspace containing a React frontend, a NestJS backend, and reusable TypeScript
packages.

## Requirements

- Node.js 22 or newer
- pnpm 11

## Getting started

```bash
pnpm install
pnpm dev
```

The web app runs at `http://localhost:5173` and proxies `/api` requests to the NestJS API
at `http://localhost:3000`.

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
