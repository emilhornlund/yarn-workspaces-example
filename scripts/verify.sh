#!/usr/bin/env bash
set -euo pipefail

# stop immediately if any command fails
# and propagate failures through pipes

echo "🔍 Running project verification..."

run_step() {
  local label="$1"
  local cmd="$2"

  echo -n "→ ${label}..."
  if eval "${cmd}" >/dev/null 2>&1; then
    echo " ✅"
  else
    echo " ❌"
    echo "Failed at step: ${label}"
    exit 1
  fi
}

run_step "Clean" "yarn clean"
run_step "Lint" "yarn lint"
run_step "Build API" "yarn build:api"
run_step "Build Web" "yarn build:web"
run_step "Test Common" "yarn test:common:cov"
run_step "Test API" "yarn test:api:cov"
run_step "Test Web" "yarn test:web:cov"
run_step "E2E API" "yarn e2e:api:cov"
run_step "E2E Web" "yarn e2e:web"

echo
echo "🎉 All verification steps succeeded!"
