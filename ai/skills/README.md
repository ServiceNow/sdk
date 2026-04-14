## fluent-skills

Claude Code skills for AI-powered fluent (ServiceNow) development.

### Skills

| Skill | Command | Description |
|---|---|---|
| **now-sdk-explain** | `/now-sdk-explain [topic]` | Fetches SDK documentation via `now-sdk explain`. Covers API types, metadata conventions, skills, and project structure. |
| **now-sdk-setup** | `/now-sdk-setup` | Configures the environment (Node.js, `@servicenow/sdk`) so that `now-sdk-explain` works. Run this first if commands fail. |

### Installation

1. Clone this repo:
   ```bash
   git clone <repo-url>
   ```

2. Open Claude Code and ask it to install the skills to your user-level `.claude` folder:
   ```
   Please install the skills from /path/to/fluent-skills into my user-level .claude folder
   ```

3. The skills will be available as slash commands (`/now-sdk-explain`, `/now-sdk-setup`) across all your projects.

### Usage

Just ask Claude to make fluent changes directly — it will automatically use `now-sdk explain` to build context about fluent conventions, metadata types, and project structure before making edits. For example:

```
Create a new fluent project for managing change requests
Add a Business Rule that prevents deletion of active incidents
Add an ACL for the custom_table table
```

You can also invoke the skills directly as slash commands if needed:

- `/now-sdk-setup` — run this first if `now-sdk` commands fail (installs Node.js 20+, `@servicenow/sdk` v4.6.0+)
- `/now-sdk-explain [topic]` — browse or search SDK documentation topics

### Owners

> ronald.chan
