# ServiceNow SDK

The ServiceNow IDE and ServiceNow SDK support developing applications in source code with ServiceNow Fluent, creating JavaScript modules, and using third-party libraries. ServiceNow Fluent is a TypeScript-based domain-specific programming language for creating application metadata in code.

# AI Skills

This repository contains agent skills for creating, editing, and deploying ServiceNow Fluent applications. These skills teach AI coding assistants how to use the [`@servicenow/sdk`](https://www.npmjs.com/package/@servicenow/sdk) CLI to look up platform conventions, metadata types, and project structure before making changes.

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

### Codex

1. Start a Codex session.
2. Run the following two commands to directly install the skills:
   ```
   $skill-installer https://github.com/ServiceNow/sdk/tree/master/skills/now-sdk-setup
   $skill-installer https://github.com/ServiceNow/sdk/tree/master/skills/now-sdk-explain
   ```
3. Restart Codex to load the skills.

### Cursor

1. Open Cursor Settings (Cmd+Shift+J).
2. Navigate to **Plugins**.
3. Paste in the link to the repo: `https://github.com/ServiceNow/sdk.git`
4. Select `Add to Cursor` for the `fluent` plugin.

Alternatively, loading the skills into Claude Code will also allow Cursor to use them.

### Kiro

The [`providers/kiro/`](providers/kiro/) directory contains a Power with steering files for each skill.

1. Open Kiro and navigate to the `Power` tab.
2. Select `Add power from GitHub`.
3. Enter this URL: `https://github.com/ServiceNow/sdk/tree/master/providers/kiro`.
4. Select the power from the list.

### Windsurf and Other Agents
Some agents may not have built in support to install skills from Github. However, you can manually install the skills by following these steps:

1. Start a new session with your favorite AI coding tool.
2. Prompt it to install the skills directly from GitHub:
   ```
   Please install these skills in my user level configuration from github: https://github.com/ServiceNow/sdk/tree/master/skills
   ```
3. The agent should be able to pull and load the skills from the configuration.
4. You may need to restart the agent to load the skills.

## Links

- [NPM Package](https://www.npmjs.com/package/@servicenow/sdk)
- [Fluent API Documentation](https://servicenow.github.io/sdk/)
- [Documentation](https://www.servicenow.com/docs/r/application-development/servicenow-sdk/servicenow-sdk-landing.html)
- [Release Notes](https://github.com/servicenow/sdk/releases)
- [Community Forum](https://www.servicenow.com/community/servicenow-ide-sdk-and-fluent/bd-p/ide-sdk-fluent-forum)
- [SDK Examples](https://github.com/servicenow/sdk-examples)
- [Discussions](https://github.com/ServiceNow/sdk/discussions)
