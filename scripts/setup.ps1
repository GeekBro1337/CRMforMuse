# scripts/setup.ps1
$ErrorActionPreference = "Stop"

Write-Host "==> Ensuring .env files..." -ForegroundColor Cyan
if (-Not (Test-Path ".\.env")) {
  if (Test-Path ".\.env.example") { Copy-Item ".\.env.example" ".\.env"; Write-Host "Copied .env.example -> .env" }
  else { Write-Host "WARNING: .env missing. Create one with AUTH0_* and DATABASE_URL" }
}
if (-Not (Test-Path ".\.env.db")) {
@"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=music_club_crm
PGPORT=5432
"@ | Out-File ".\.env.db" -Encoding UTF8
  Write-Host "Created .env.db"
}

Write-Host "==> Install deps (pnpm i)..." -ForegroundColor Cyan
pnpm install

Write-Host "==> Docker up..." -ForegroundColor Cyan
docker compose up -d

Write-Host "==> Wait for Postgres (health)..." -ForegroundColor Cyan
$ok=$false
for ($i=0; $i -lt 15; $i++) {
  $state = (docker inspect --format='{{.State.Health.Status}}' musicclub-postgres 2>$null)
  if ($state -eq "healthy") { $ok=$true; break }
  Start-Sleep -Seconds 2
}

Write-Host "==> Prisma generate & migrate..." -ForegroundColor Cyan
pnpm prisma:gen
pnpm prisma:migrate

if (Test-Path ".\prisma\seed.ts") {
  Write-Host "==> Prisma seed..." -ForegroundColor Cyan
  node --loader tsx prisma/seed.ts 2>$null; if ($LASTEXITCODE -ne 0) { node prisma/seed.ts }
}

Write-Host "==> Start dev server..." -ForegroundColor Green
pnpm dev
