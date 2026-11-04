---
name: now-sdk
description: Use whenever the user mentions fluent, ServiceNow, or the now-sdk, OR when the user prompts for edits within a fluent application (identified by a now.config.json at the project root). Also use when the user needs live instance data — looking up a sys_id, inspecting table columns or schema, checking whether a record already exists, fetching choice values, or reading role or scope info.
argument-hint: "[topic or table]"
---

## Getting oriented — required before other work

Condition: the project root contains `now.config.json` (same role as `package.json` for an npm project — walk up from cwd to find it, and treat each one found as a distinct fluent project, not a nested copy of another).
Action: run the orientation below for that project. Docs are versioned together with the `@servicenow/sdk` version installed per-project — orientation done for one project does NOT transfer to another. Re-run this for every distinct `now.config.json` you touch, even within the same session.

Step 1 — run all three:

```bash
npx @servicenow/sdk explain quickstart --list --format=raw
npx @servicenow/sdk explain fluent-language --list --format=raw
npx @servicenow/sdk --help
```

Both lists are required — `fluent-language` is not a subset of `quickstart`.

Step 2 — read every topic returned by both `--list` calls in full, plus `keys-file` by name (not reliably tagged into either list). Read each topic once even if reachable multiple ways. Do not skip any. Do not `--peek` first — they are already pre-scoped, so peeking first is redundant overhead, not a safety step:

```bash
npx @servicenow/sdk explain <topic> --format=raw
npx @servicenow/sdk explain keys-file --format=raw
```

Step 3 — treat this content as required working knowledge for the rest of this project's session. Do not re-derive fluent conventions from guesswork once they've been covered here — this includes safety-critical rules such as never deleting a `Table()`/`BusinessRule()`/`Record()` definition from a `.now.ts` file without confirming with the user first (deletion may need to propagate as an upgrade-time delete via `keys.ts`, which the code alone can't reveal). If uncertain later, re-run `--peek` on the specific topic rather than relying on memory:

```bash
npx @servicenow/sdk explain <topic> --peek --format=raw
```

Rule: before using any subcommand for the first time, run `npx @servicenow/sdk <subcommand> --help` first — `--help` at the top level lists subcommands but not their flags. Never guess flag names.

## SDK Documentation (explain)

Rule: never open a full topic without `--peek` first, except quickstart topics (covered in Getting oriented above — read those directly, no peek needed).

`explain` (including `--peek` and `--list`) is read-only documentation lookup with no side effects. Do not ask the user for confirmation before running it — peek and read relevant topics automatically as part of the task.

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

- **Metadata types** — `BusinessRule`, `Table`, `Acl`, `Flow`, `ScriptInclude`, `ClientScript`, `UiPolicy`
- **Skills** — workflows like `build`, `transform`, `deploy`, `auth`
- **Conventions** — `naming`, `structure`, `scoping`, `file-layout`

### For any task — always start here

Step order: search (`--list`) → peek (`--peek`) → read full topic. Repeat for every relevant topic — fluent behavior is often split across multiple topics, so stopping at one risks an incomplete picture.

- Search: `npx @servicenow/sdk explain <search-term> --list --format=raw`
- Peek: `npx @servicenow/sdk explain <topic> --peek --format=raw`
- Read (only if peek confirms relevance): `npx @servicenow/sdk explain <topic> --format=raw`

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

The required flag for filtering is `-q` / `--query`. Every query call needs it along with the table name.
Always include the `-o json` flag to output machine-readable json.

```bash
npx @servicenow/sdk query <table> -q '<query>' -o json
```

Rule: query output is live instance data, not documentation. Do not retain it as project knowledge the way quickstart topics are retained — treat it as scoped to the current task only.
