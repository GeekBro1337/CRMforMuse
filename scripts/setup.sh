#!/usr/bin/env bash
set -euo pipefail

echo "==> Ensuring .env files..."
[ -f ".env" ] || { [ -f ".env.example" ] && cp .env.example .env || echo "WARNING: .env missing"; }
[ -f ".env.db" ] || cat > .env.db << 'EOF'
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=music_club_crm
PGPORT=5432
EOF

echo "==> Install deps (pnpm i)..."
pnpm install

echo "==> Docker up..."
docker compose up -d

echo "==> Wait for Postgres (health)..."
for _ in {1..15}; do
  state=$(docker inspect --format='{{.State.Health.Status}}' musicclub-postgres 2>/dev/null || true)
  [ "$state" = "healthy" ] && break || sleep 2
done

echo "==> Prisma generate & migrate..."
pnpm prisma:gen
pnpm prisma:migrate

if [ -f "prisma/seed.ts" ]; then
  echo "==> Prisma seed..."
  npx tsx prisma/seed.ts || node prisma/seed.ts || true
fi

echo "==> Start dev server..."
pnpm dev
