#!/usr/bin/env bash
# Copies the canonical skills/now-sdk/SKILL.md into each provider plugin
# directory. Run this after editing skills/now-sdk/SKILL.md.
#
# Provider copies must be real files (not symlinks) because plugin
# marketplaces that fetch this repo via a git-subdir source only pull the
# path they're scoped to (e.g. providers/claude/plugin) — a symlink pointing
# outside that path resolves to nothing and the skill fails to load
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
canonical="$repo_root/skills/now-sdk/SKILL.md"

targets=(
  "$repo_root/providers/claude/plugin/skills/now-sdk/SKILL.md"
  "$repo_root/providers/cursor/plugin/skills/now-sdk/SKILL.md"
  "$repo_root/providers/grok/plugin/skills/now-sdk/SKILL.md"
)

for target in "${targets[@]}"; do
  if [ -L "$target" ]; then
    rm "$target"
  fi
  mkdir -p "$(dirname "$target")"
  cp "$canonical" "$target"
  echo "synced ${target#"$repo_root"/}"
done
