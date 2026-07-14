# Provider Plugins

This directory contains plugins for different AI code editors and agents.

| Provider | Path | Manifest |
|----------|------|----------|
| Claude Code | `providers/claude/plugin/` | `.claude-plugin/plugin.json` |
| Cursor | `providers/cursor/plugin/` | `.cursor-plugin/plugin.json` |
| Grok | `providers/grok/plugin/` | `.grok-plugin/plugin.json` |
| Kiro | `providers/kiro/` | `POWER.md` |

## Skills

Skills in `providers/*/plugin/skills/` are real file copies of the canonical [`skills/`](../skills/) directory, not symlinks — some plugin marketplaces fetch this repo via a git-subdir source scoped to a single provider path, and a symlink pointing outside that path resolves to nothing.

When updating a skill, edit the canonical source under `skills/`, then run `./scripts/sync-skills.sh` to copy the change into every provider directory before committing.
