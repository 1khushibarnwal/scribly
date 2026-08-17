#!/bin/bash
set -euo pipefail

# Runs from the Vercel "Root Directory" (frontend/), but git diff still
# returns paths relative to the REPO ROOT.

PREV_SHA="${VERCEL_GIT_PREVIOUS_SHA:-}"
CURR_SHA="${VERCEL_GIT_COMMIT_SHA:-HEAD}"

deploy() {
    echo "Frontend-relevant files changed. Proceeding with deployment."
    exit 1
}

skip() {
    echo "Only docs/backend files changed. Skipping deployment."
    exit 0
}

if [[ -z "$PREV_SHA" ]]; then
    if git rev-parse --verify --quiet HEAD^ >/dev/null; then
        PREV_SHA="HEAD^"
    else
        deploy
    fi
fi

if ! git rev-parse --verify --quiet "$PREV_SHA" >/dev/null || \
   ! git rev-parse --verify --quiet "$CURR_SHA" >/dev/null; then
    echo "Could not resolve commit range. Deploying to be safe."
    deploy
fi

# NOTE: -C points git at the repo root so this works no matter which
# directory Vercel invokes the script from.
# NOTE: using a temp file instead of process substitution (< <(...)) -
# Vercel's build container doesn't reliably support /dev/fd, which makes
# process substitution fail with "No such file or directory".
DIFF_FILE="$(mktemp)"
git -C "$(git rev-parse --show-toplevel)" diff --name-only -z "$PREV_SHA" "$CURR_SHA" > "$DIFF_FILE"

CHANGED=0
while IFS= read -r -d '' file; do
    CHANGED=1
    case "$file" in
        README.md|LICENSE) ;;         # safe to ignore
        backend/*) ;;                  # backend is deployed on Render, not Vercel
        *) rm -f "$DIFF_FILE"; deploy ;;  # anything else (frontend/, root config, etc.) -> deploy
    esac
done < "$DIFF_FILE"
rm -f "$DIFF_FILE"

if [[ "$CHANGED" -eq 0 ]]; then
    skip
fi

skip