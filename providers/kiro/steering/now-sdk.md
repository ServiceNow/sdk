---
inclusion: auto
name: Now Sdk
description: Use whenever the user mentions fluent, ServiceNow, or the now-sdk, OR when the user prompts for edits within a fluent application (identified by a now.config.json at the project root). Also use when the user needs live instance data — looking up a sys_id, inspecting table columns or schema, checking whether a record already exists, fetching choice values, or reading role or scope info.
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

`explain` resolves its argument in one of three ways, and the output tells you which:

- **An exact topic name** returns that full document.
- **A short or ambiguous keyword** (`acl`, `flow`) returns `# Multiple matching topics` — a list of topic names with descriptions, no excerpts. Pick one and read it by name.
- **A search phrase** returns `# No exact match for "..."` followed by the closest topics ranked by relevance, each with its description and the passage that matched.

A search phrase does not need to match a topic name; the ranking matches topic descriptions and document bodies too. The ranked list holds up to 5 entries but returns fewer when little scores well — a short list is not itself a sign of a bad query.

To search, state the task **and the mechanism you think implements it**:

```bash
npx @servicenow/sdk explain "<task> with a <mechanism>" --format=raw
```

A query that only describes an outcome tends to match documents that merely discuss that outcome rather than the artifact that delivers it. You do not need the exact type name — a rough mechanism word is enough, and platform shorthand works best (`acl` beats "access control"). Skip the mechanism when the task already names the artifact, as in "run a job on a schedule".

Split a task with two halves into two searches. "A catalog item that kicks off a flow on submit" is a catalog question and a trigger question; searched separately each returns its own guide and API pair, where one combined query has to rank against both at once.

To see further down the ranking, or to get the complete ranked list instead of the top 5:

```bash
npx @servicenow/sdk explain "<search phrase>" --range 6-10 --format=raw
npx @servicenow/sdk explain "<search phrase>" --list --format=raw
```

To show all available topics with their related tags:

```bash
npx @servicenow/sdk explain --list --format=raw
```

To read a topic in full, by name:

```bash
npx @servicenow/sdk explain <topic-name> --format=raw
```

IMPORTANT: ranked search output is for **choosing** a topic, never for answering. Each entry is a description plus a few truncated lines with the surrounding conditions, caveats, and required properties stripped out. Never write code from an excerpt — once the search identifies the topic, read that topic in full. A search phrase already returns each candidate's description, so `--peek` adds nothing after a search; use `--peek` only when you reached a topic name by guesswork, to avoid opening the wrong full document.

### What to search for

- **Tasks plus mechanism** — "block a delete with a script", "restrict read access with an acl", "make a field mandatory with a policy"
- **Mechanism words worth adding** — `script`, `acl`, `role`, `policy`, `notification`, `schedule`, `flow`, `form`, `list`, `table`, `column`, `test`
- **Metadata types** — `BusinessRule`, `Table`, `Acl`, `Flow`, `ScriptInclude`, `ClientScript`
- **Skills** — workflows like `build`, `transform`, `deploy`, `auth`
- **Conventions** — `naming`, `structure`, `scoping`, `file-layout`

### For any task — always start here

- Start by searching for the task plus the mechanism you think implements it: `npx @servicenow/sdk explain "<task> with a <mechanism>" --format=raw`.
- Use the descriptions and matched excerpts only to decide which topics are relevant, then read each relevant topic in full with `npx @servicenow/sdk explain <topic-name> --format=raw`.
- Follow cross-references — a guide routinely names further topics the search did not surface, and those are part of the answer.
- Read a guide together with its `*-api` reference; they usually rank adjacently. The guide gives the pattern and the pitfalls, the API topic the exact properties.
- Be suspicious of a top hit that merely repeats your wording. The characteristic failure is a document that shares vocabulary with the query but solves a different problem.
- Many items are spread out across multiple topics. As such, it is very important to read all relevant topics before making any changes.

### If explain fails

- `explain` is only available in `@servicenow/sdk` versions >= `4.6.0` — upgrade if the command is not found.
- `No matching topics for "<query>"` — nothing scored high enough; rephrase with a different mechanism word, or run `--list` to browse all topics.
- A query close to a topic name returns ranked suggestions instead of an error, so a near-miss or misspelled name is self-correcting — take the right name from the list and read that.
- An irrelevant result set does not mean the behavior is unsupported or unconstrained. The ranking always returns its nearest neighbours, so the absence of a matching topic is not evidence that no rule exists.

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
Always include the `-o json` flag to output machine readable json

```bash
npx @servicenow/sdk query <table> -q '<query>' -o json
```
