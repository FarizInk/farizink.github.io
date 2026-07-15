#!/usr/bin/env bash
set -euo pipefail

# Unified deploy script for farizink.github.io → GitHub Pages.
#
# Usage:  ./deploy.sh
#
# It temporarily comments out VITE_API_BASE_URL in .env so the production build
# falls back to the public API (https://soul.fariz.dev) from src/lib/constants.ts,
# then builds, deploys via gh-pages, and ALWAYS restores .env to its original
# state afterwards — even if build or deploy fails (or is interrupted).

ENV_FILE=".env"
BACKUP="$(mktemp)"   # temp backup in /tmp, never committed

restore_env() {
  if [ -s "$BACKUP" ]; then
    mv -f "$BACKUP" "$ENV_FILE"
    echo "↩️  .env restored to original"
  else
    rm -f "$BACKUP"
  fi
}
trap restore_env EXIT

# 1) Comment VITE_API_BASE_URL so the build uses the public API URL
if [ -f "$ENV_FILE" ]; then
  cp "$ENV_FILE" "$BACKUP"
  sed -i -E 's/^([[:space:]]*)(VITE_API_BASE_URL=)/\1# \2/' "$ENV_FILE"
  echo "🔇  VITE_API_BASE_URL commented for production build"
else
  echo "ℹ️  No .env found — building with defaults"
fi

# 2) Build
echo "🏗️  Building (bun run build)…"
bun run build

# 3) Deploy: write CNAME, push dist/ to the gh-pages branch
echo "🚀  Deploying to GitHub Pages…"
echo 'fariz.dev' > ./dist/CNAME
node ./gh-pages.cjs

echo "✅  Deploy complete"
