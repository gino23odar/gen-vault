#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

<<<<<<< codex/build-forest-inspired-full-stack-web-app-iwrasi
if ! command -v docker >/dev/null 2>&1; then
  echo "Error: docker is required but not installed." >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Error: docker compose plugin is required." >&2
  exit 1
fi

echo "[1/2] Starting full stack with Docker (db + backend + frontend)..."
echo "      Press Ctrl+C to stop."

echo "[2/2] Running: docker compose up --build"
exec docker compose up --build
=======
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required but not installed." >&2
  exit 1
fi

echo "[1/4] Installing root workspace dependencies..."
npm install

echo "[2/4] Copying environment templates when missing..."
[[ -f backend/.env ]] || cp backend/.env.example backend/.env
[[ -f frontend/.env ]] || cp frontend/.env.example frontend/.env

echo "[3/4] Prisma generate (backend)..."
npm run prisma:generate --workspace backend

echo "[4/4] Starting frontend + backend..."
exec npm run dev
>>>>>>> main
