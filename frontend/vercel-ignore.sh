#!/bin/bash
set -euo pipefail

# Prefer Vercel's own "previous deployed commit" if available — this
# correctly covers multi-commit pushes, not just the latest commit.
PREV_SHA="${VERCEL_GIT_PREVIOUS_SHA:-}"
CURR_SHA="${VERCEL_GIT_COMMIT_SHA:-HEAD}"

deploy() {
    echo "Application files changed. Proceeding with deployment."
    exit 1
}

skip() {
    echo "Only README.md and/or LICENSE changed. Skipping deployment."
    exit 0
}

# Fallback if VERCEL_GIT_PREVIOUS_SHA isn't set (e.g. first-ever deploy,
# or running locally). Use HEAD^ if it exists, otherwise this is the
# repo's first commit -> nothing to compare against, so deploy.
if [[ -z "$PREV_SHA" ]]; then
    if git rev-parse --verify --quiet HEAD^ >/dev/null; then
        PREV_SHA="HEAD^"
    else
        deploy
    fi
fi

# Sanity check both refs actually exist (e.g. shallow clone edge cases)
if ! git rev-parse --verify --quiet "$PREV_SHA" >/dev/null || \
   ! git rev-parse --verify --quiet "$CURR_SHA" >/dev/null; then
    echo "Could not resolve commit range. Deploying to be safe."
    deploy
fi

# Null-terminated to safely handle filenames with spaces/newlines
CHANGED=0
while IFS= read -r -d '' file; do
    CHANGED=1
    if [[ "$file" != "README.md" && "$file" != "LICENSE" ]]; then
        deploy
    fi
done < <(git diff --name-only -z "$PREV_SHA" "$CURR_SHA")

# If literally nothing changed, don't bother deploying either
if [[ "$CHANGED" -eq 0 ]]; then
    skip
fi

skip