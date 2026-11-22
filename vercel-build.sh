#!/usr/bin/env bash
# Build de publicação no Vercel: start na raiz e solution em /solution/.
set -euo pipefail
OUT=vercel-dist
rm -rf "$OUT" && mkdir -p "$OUT"

(cd start && npm ci --no-audit --no-fund && npx ng build)
cp -R start/dist/loja-acessivel/browser/. "$OUT"/

(cd solution && npm ci --no-audit --no-fund && npx ng build --base-href /solution/)
mkdir -p "$OUT/solution"
cp -R solution/dist/loja-acessivel/browser/. "$OUT/solution"/
