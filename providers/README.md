# Provider Plugins

This directory contains plugins for different AI code editors and agents.

| Provider | Path | Manifest |
|----------|------|----------|
| Claude Code | `providers/claude/plugin/` | `.claude-plugin/plugin.json` |
| Cursor | `providers/cursor/plugin/` | `.cursor-plugin/plugin.json` |
| Grok | `providers/grok/plugin/` | `.grok-plugin/plugin.json` |
| Kiro | `providers/kiro/` | `POWER.md` |

## Skills

Skills in `providers/*/plugin/skills/` are symlinked from the canonical [`skills/`](../skills/) directory. When updating skills, edit the canonical source — provider copies pick up the changes automatically.
