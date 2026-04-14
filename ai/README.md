# ServiceNow SDK AI Skills

AI skills for creating, editing, and deploying ServiceNow SDK (Fluent) applications. These skills teach AI coding assistants how to use the `@servicenow/sdk` CLI to look up platform conventions, metadata types, and project structure before making changes. No need to directly call the skills - they are automatically triggered when working in a Fluent app or when ServiceNow/Fluent topics are mentioned.

> [!IMPORTANT]
> These skills rely on features available only in version `4.6.0` or newer of the SDK.

## Skills

| Skill | Description |
|---|---|
| **now-sdk-explain** | Fetches SDK documentation via `npx @servicenow/sdk explain`. Covers API types, metadata conventions, skills, and project structure. Automatically triggered when working in a Fluent app or when ServiceNow/Fluent topics are mentioned. |
| **now-sdk-setup** | Configures the environment (Node.js 20+, `@servicenow/sdk` v4.6.0+) so that `now-sdk explain` works. Run this if `now-sdk-explain` fails with environment errors. |

## Setup by Tool

### Claude Code

1. Start a Claude Code session.
2. Add the marketplace and install the plugin:
   ```
   /plugin marketplace add servicenow/sdk
   /plugin install fluent
   /reload-plugins
   ```

### Kiro

The `kiro/` directory contains a Power with steering files for each skill.

1. Open Kiro and navigate to the `Power` tab.
2. Select `Add power from GitHub`.
3. Enter this URL: `https://github.com/ServiceNow/sdk/ai/kiro`.
4. Select the power from the list.
