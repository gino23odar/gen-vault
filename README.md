# Verdant Mythic Vault

A full-stack monorepo starter for a premium fantasy bird-generation experience set in a magical woodland world of froggies, birds, and bears.

## Overview

This project is a production-minded prototype with:
- **Landing page** with cinematic hero + scroll-driven staged character transformation.
- **Field section** that displays generated birds in a living woodland scene.
- **Generator/Vault page** for prompt-based bird generation, lore, and collection management.
- **Auth-first architecture** with protected user bird data.
- **Provider abstraction** for LLM/lore/2D/3D generation with mock-service mode.

> Placeholder content and assets are intentionally obvious and easy to replace.

## Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **3D / Motion**: React Three Fiber, Drei, Framer Motion
- **Backend**: Node.js + TypeScript + Express
- **ORM / DB**: Prisma + PostgreSQL
- **Auth**: JWT + HTTP-only cookie sessions
- **DevOps**: Docker, docker-compose

## Monorepo Structure

```
.
├─ frontend/               # React client
├─ backend/                # API server + Prisma schema
├─ docker-compose.yml      # Full local stack (frontend + backend + postgres)
└─ README.md
```

## Quick Start (Local, no Docker)

### 1) Install deps

```bash
npm install
```

### 2) Configure environment

Copy and edit env files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3) Start Postgres (or use your own)

If you have local Postgres:
- Create DB `verdant_vault`
- Update `backend/.env` `DATABASE_URL`

### 4) Run Prisma

```bash
npm run prisma:generate --workspace backend
npm run prisma:migrate --workspace backend
```

### 5) Start apps

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

### One-command install + run

macOS / Linux:

```bash
./run_app.sh
```

Windows (PowerShell):

```powershell
./run_app.ps1
```

These scripts start the full Docker stack (Postgres + backend + frontend) using `docker compose up --build`, so the database is included automatically.

## Run with Docker

```bash
docker compose up --build
```

The backend container automatically applies Prisma schema with `prisma db push` before starting the dev server.

Services:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Postgres: `localhost:5432`

## Auth Model

- Endpoints: `/api/auth/signup`, `/api/auth/signin`, `/api/auth/signout`, `/api/auth/me`
- Passwords hashed with bcrypt.
- Backend returns and verifies JWT in http-only cookie.
- Bird APIs require auth middleware.

## Mock-Service Mode

`backend/.env`:

- `MOCK_MODE=true` enables deterministic mocked generation for:
  - bird core metadata
  - lore generation
  - 2D preview asset URL
  - 3D model reference URL

Switch to real providers:
- Set `MOCK_MODE=false`
- Implement real provider adapters in `backend/src/providers`
- Add provider env vars and keys.

## Provider Swapping Architecture

The backend composes providers through interfaces:
- `LoreProvider`
- `BirdImage2DProvider`
- `BirdAsset3DProvider`

Factory: `backend/src/providers/index.ts`.

To integrate OpenAI/local/custom:
1. Add adapter class implementing the interface.
2. Register in provider factory.
3. Switch with env config.

## API Highlights

- `POST /api/birds/generate`
- `GET /api/birds`
- `GET /api/birds/:id`
- `PATCH /api/birds/:id/favorite`
- `PATCH /api/birds/reorder`
- `DELETE /api/birds/:id`
- `GET /api/prompts`
- `GET /api/field/birds`

## Deployment Recommendation

- **Frontend**: Vercel (static + SPA)
- **Backend**: Railway / Render / Fly.io
- **Database**: Neon / Supabase Postgres / Railway Postgres

### Required environment variables

Backend:
- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `FRONTEND_URL`
- `MOCK_MODE`

Frontend:
- `VITE_API_URL`

## Placeholder Replacement Guide

- Hero/field mesh styles: `frontend/src/components/scene/*`
- Visual copy and lore card text: `frontend/src/pages/*`
- Bird placeholders: backend mock providers in `backend/src/providers/mock/*`

## Future Integration Points (TODO-ready)

- Real text/lore generation provider in `backend/src/providers`.
- Real 2D asset generation + storage (S3/Cloudinary).
- Real 3D generation/hosting pipeline (GLB outputs).
- Advanced auth (refresh tokens, OAuth providers, password reset).
