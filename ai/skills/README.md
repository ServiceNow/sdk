## fluent-skills

Skills for AI-powered fluent (ServiceNow) development.

### Skills

| Skill | Command | Description |
|---|---|---|
| **now-sdk-explain** | `/now-sdk-explain [topic]` | Fetches SDK documentation via `now-sdk explain`. Covers API types, metadata conventions, skills, and project structure. |
| **now-sdk-setup** | `/now-sdk-setup` | Configures the environment (Node.js, `@servicenow/sdk`) so that `now-sdk-explain` works. Run this first if commands fail. |

### Installation

1. Clone this repo:
   ```bash
   git clone https://github.com/ServiceNow/sdk
   ```

2. Install the contents of `sdk/ai/skills` into your AI tool of choice:
    - **Claude Code**: [https://code.claude.com/docs/en/skills#where-skills-live](https://code.claude.com/docs/en/skills#where-skills-live)
    - **OpenAI Codex**: [https://developers.openai.com/codex/skills#where-to-save-skills](https://developers.openai.com/codex/skills#where-to-save-skills)

### Usage

Just ask your agent to perform ServiceNow SDK (Fluent) tasks changes directly — it will automatically use `now-sdk explain` to build context about fluent conventions, metadata types, and project structure before making edits.

For example:
```
Create a new Fluent project for managing change requests
Add a Business Rule that prevents deletion of active incidents
Add an ACL for the custom_table table
```

Some AI tools like **Claude Code** allow invoking the skills directly as slash commands, if needed:

- `/now-sdk-setup` — run this first if `now-sdk` commands fail (installs Node.js 20+, `@servicenow/sdk` v4.6.0+)
- `/now-sdk-explain [topic]` — browse or search SDK documentation topics
