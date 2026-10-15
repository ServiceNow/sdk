# ServiceNow SDK

The ServiceNow SDK brings modern developer workflows to the Now Platform: build applications as source code, version them with git, and ship them using the tools you already know. It pairs with ServiceNow Fluent, a TypeScript-based DSL for defining application metadata in code, and supports JavaScript modules and third-party libraries alongside it.

## Getting Started

New to the ServiceNow SDK and Fluent? Install the SDK, initialize a project, and build your first Fluent application by following the [Getting Started guide](https://servicenow.github.io/sdk/getting-started?utm_source=github&utm_medium=readme&utm_campaign=sdk).

Ready to bring Fluent into your team's development lifecycle? See the [SDLC guide](https://servicenow.github.io/sdk/guides/sdlc-guide?utm_source=github&utm_medium=readme&utm_campaign=sdk) for recommended source control, environment, and release practices.

## AI Skills

This repository contains agent skills for creating, editing, and deploying ServiceNow Fluent applications. Rather than guessing at Fluent syntax or platform behavior, an AI coding assistant with these skills installed will consult the SDK's own documentation and your live instance before writing code, so the changes it makes follow real Fluent conventions and match what's actually deployed. Concretely, this lets an agent:

- **Orient itself in a Fluent project automatically.** When it detects a `now.config.json`, it walks through the SDK's `quickstart` and `fluent-language` documentation first, so it understands project structure, metadata types, and conventions before editing anything.
- **Look up authoritative Fluent guidance on demand.** `explain` reads directly from the documentation shipped inside the installed `@servicenow/sdk` package itself, so the agent is always referencing docs that match the exact SDK version in your project rather than relying on outdated training data or docs that have drifted from your version. It can search and read topics on metadata types (`Table`, `BusinessRule`, `Acl`, `Flow`, `ScriptInclude`, `ClientScript`, `UiPolicy`, etc.), workflows (`build`, `transform`, `deploy`, `auth`), and conventions (`naming`, `structure`, `scoping`, `file-layout`).
- **Query your live instance.** Using `query`, it can check whether a record already exists, look up a `sys_id`, inspect table/column schema, or fetch choice and role/scope info — grounding generated code in your actual instance data rather than assumptions.
- **Avoid unsafe changes.** It knows platform-specific gotchas, such as never deleting a `Table()`/`BusinessRule()`/`Record()` definition from a `.now.ts` file without confirming with you first, since deletions may need to propagate as an upgrade-time delete via `keys.ts`.

> [!IMPORTANT]
> These skills rely on features available only in version `4.6.0` or newer of the SDK.
> The `query` capability additionally requires version `4.8.0` or newer.

## Skills

| Skill       | Description                                                                                                                                                                                                                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **now-sdk** | Covers CLI discovery, SDK documentation, and live instance queries. Automatically triggered when working in a Fluent app or when ServiceNow/Fluent topics are mentioned. Uses `npx @servicenow/sdk --help` and `explain quickstart` to orient the agent, then provides guidance for the `explain` and `query` subcommands. |

## Setup by Tool

### Claude Code

1. Start a Claude Code session.
2. Install the `servicenow-sdk` plugin from the `claude-plugins-official` marketplace:
   ```
   /plugin install servicenow-sdk@claude-plugins-official
   /reload-plugins
   ```

### Codex

1. Start a Codex session.
2. Run the following command to directly install the skill:
   ```
   $skill-installer https://github.com/ServiceNow/sdk/tree/master/skills/now-sdk
   ```
3. Restart Codex to load the skill.

### Cursor

1. Open Cursor Settings (Cmd+Shift+J).
2. Navigate to **Plugins**.
3. Paste in the link to the repo: `https://github.com/ServiceNow/sdk.git`
4. Select `Add to Cursor` for the `servicenow-sdk` plugin.

Alternatively, loading the skills into Claude Code will also allow Cursor to use them.

### GitHub Copilot

1. Update GitHub CLI to version `2.90.0` or later, then install the skill directly from this repo:
   ```
   gh skill install ServiceNow/sdk now-sdk
   ```
   By default this installs the skill as a project skill in `.github/skills/now-sdk`. Add `--scope user` to install it as a personal skill (`~/.copilot/skills/now-sdk`) shared across all your projects instead.
2. In an open Copilot CLI session, run `/skills reload`, or start a new session to load the skill.
3. Confirm it loaded with `/skills info now-sdk`.

Alternatively, without GitHub CLI, manually copy the [`skills/now-sdk`](skills/now-sdk) directory into `.github/skills/now-sdk` (project) or `~/.copilot/skills/now-sdk` (personal), then run `/skills reload`.

### Grok

1. Start a Grok session.
2. Add the marketplace and install the plugin:
   ```
   grok plugin marketplace add servicenow/sdk
   grok plugin install servicenow-sdk --trust
   ```
3. Restart Grok or run `/plugins` and reload plugins to load the skill.

Alternatively, install the plugin directly without adding the marketplace:

```
grok plugin install servicenow/sdk#providers/grok/plugin --trust
```

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
- [Documentation](https://servicenow.github.io/sdk/)
- [Release Notes](https://github.com/servicenow/sdk/releases)
- [Discussions & Support](https://github.com/ServiceNow/sdk/discussions)
- [SDK Examples](https://github.com/servicenow/sdk-examples)
