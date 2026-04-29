$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Error "docker is required but was not found in PATH."
}

try {
  docker compose version | Out-Null
} catch {
  Write-Error "docker compose plugin is required."
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Error "npm is required but was not found in PATH."
}

Write-Host "Running: docker compose up --build"
docker compose up --build

Write-Host "[1/4] Installing root workspace dependencies..."
npm install

Write-Host "[2/4] Copying environment templates when missing..."
if (-not (Test-Path "backend/.env")) { Copy-Item "backend/.env.example" "backend/.env" }
if (-not (Test-Path "frontend/.env")) { Copy-Item "frontend/.env.example" "frontend/.env" }

Write-Host "[3/4] Prisma generate (backend)..."
npm run prisma:generate --workspace backend

Write-Host "[4/4] Starting frontend + backend..."
npm run dev
