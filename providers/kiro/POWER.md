---
name: ServiceNow SDK
displayName: ServiceNow SDK
description: 'Use when the user mentions ServiceNow, Now SDK, fluent, or @servicenow/sdk,
    or when editing a Fluent application (identified by now.config.json at the
    project root). Covers SDK documentation, metadata authoring, build, and deploy.'
keywords:
- now-sdk-explain
- now-sdk-setup
---

# Fluent Skills

Fluent Skills: Use whenever the user mentions fluent, ServiceNow, or the now-sdk, OR when the user prompts for edits within a fluent application (identified by a now.config.json at the project root);…

## Included skills

| Skill / Reference | Steering file | Description |
| ----------------- | ------------- | ----------- |
| **Now Sdk Explain** | `steering/now-sdk-explain.md` | Use whenever the user mentions fluent, ServiceNow, or the now-sdk, OR when the user prompts for edits within a fluent application (identified by a now.config.json at the project root). Fetches SDK do… |
| **Now Sdk Setup** | `steering/now-sdk-setup.md` | Configure the environment so now-sdk explain is usable. Run before now-sdk-explain if the command is not found or returns errors. |

## Using this power

Reference skills in your prompts with `#steering/<filename>`, e.g.
`#steering/now-sdk-explain.md`.

To have Kiro automatically load a skill when it's relevant, change its
`inclusion` field from `manual` to `auto` (keep the `name` and `description`
fields — Kiro uses them for relevance matching).

## Notes

- Auto-generated from Claude Code skill files.
- Review each `steering/` file and adjust `inclusion` as needed.
- Add `mcp.json` alongside `POWER.md` if this power requires MCP servers.
