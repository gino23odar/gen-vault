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

Write-Host "[1/2] Starting full stack with Docker (db + backend + frontend)..."
Write-Host "      Press Ctrl+C to stop."
Write-Host "[2/2] Running: docker compose up --build"
docker compose up --build
