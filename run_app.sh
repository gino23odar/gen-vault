#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

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
