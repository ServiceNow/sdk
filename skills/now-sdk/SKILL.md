---
name: now-sdk
description: Use whenever the user mentions fluent, ServiceNow, or the now-sdk, OR when the user prompts for edits within a fluent application (identified by a now.config.json at the project root). Also use when the user needs live instance data — looking up a sys_id, inspecting table columns or schema, checking whether a record already exists, fetching choice values, or reading role or scope info.
argument-hint: "[topic]"
---

## Getting oriented

The first time this skill is invoked in a session, run these two commands to orient yourself on all available CLI features and fluent fundamentals:

```bash
npx @servicenow/sdk --help
npx @servicenow/sdk explain quickstart --list --format=raw
```

`npx @servicenow/sdk --help` lists available subcommands but does not show their flags. Before using any subcommand for the first time, always run `npx @servicenow/sdk <subcommand> --help` to see its full options. Never guess flag names — they vary by subcommand and guessing leads to errors.

Then read each quickstart topic in full:

```bash
npx @servicenow/sdk explain <quickstart-topic> --format=raw
```

## SDK Documentation (explain)

IMPORTANT: _Never_ open a full topic without first viewing the summary via the `--peek` option! This will prevent you from accidentally opening the wrong topic and wasting context space.

To show all available topics with their related tags:

```bash
npx @servicenow/sdk explain --list --format=raw
```

To search for topics, showing the descriptions of all matches:

```bash
npx @servicenow/sdk explain <topic> --list --peek --format=raw
```

To preview a topic:

```bash
npx @servicenow/sdk explain <topic> --peek --format=raw
```

Once you are certain you want to read the full topic, open it like this:

```bash
npx @servicenow/sdk explain <topic> --format=raw
```

### What to search for

- **Metadata types** — `BusinessRule`, `Table`, `Acl`, `Flow`, `ScriptInclude`, `ClientScript`
- **Skills** — workflows like `build`, `transform`, `deploy`, `auth`
- **Conventions** — `naming`, `structure`, `scoping`, `file-layout`

### For any task — always start here

- Start by searching for topics using `npx @servicenow/sdk explain <search-term> --list --format=raw`.
- Continue by reading the relevant topics, always using `npx @servicenow/sdk explain <topic> --peek --format=raw`, to preview the description before committing to read the full topic.
- Provided the description is relevant, continue to read the full topic using `npx @servicenow/sdk explain <topic> --format=raw`.
- Many items are spread out across multiple topics. As such, it is very important to read all relevant topics before making any changes.

### If explain fails

- `explain` is only available in `@servicenow/sdk` versions >= `4.6.0` — upgrade if the command is not found.
- `No documentation found for "<topic>"` — wrong topic name, try `--list`
- `No match for "<topic>"` — use a different search term

## Live Instance Queries (query)

`query` is only available in `@servicenow/sdk` versions >= `4.8.0`. If the command is not found, check the installed version and inform the user to upgrade.

Before writing any `query` call, run the subcommand help to get the exact flag names — the top-level `--help` does not show subcommand flags, so do not guess:

```bash
npx @servicenow/sdk query --help
```

Then read the full usage guide and encoded query format guide for deeper context:

```bash
npx @servicenow/sdk explain query --format=raw
npx @servicenow/sdk explain encoded-query-guide --format=raw
```

The required flag for filtering is `-q` / `--query`. Every query call needs it along with the table name

```bash
npx @servicenow/sdk query <table> -q '<query>'
```
