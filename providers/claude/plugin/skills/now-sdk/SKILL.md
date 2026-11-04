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

`explain` resolves its argument in one of three ways, and the output tells you which:

- **An exact topic name** returns that full document.
- **A short or ambiguous keyword** (`acl`, `flow`) returns `# Multiple matching topics` — a list of topic names with descriptions, no excerpts. Pick one and read it by name.
- **A search phrase** returns `# No exact match for "..."` followed by the closest topics ranked by relevance, each with its description and the passage that matched.

A search phrase does not need to match a topic name; the ranking matches topic descriptions and document bodies too. The ranked list holds up to 5 entries but returns fewer when little scores well — a short list is not itself a sign of a bad query.

`explain` (including `--peek` and `--list`) is read-only documentation lookup with no side effects. Do not ask the user for confirmation before running it — search and read relevant topics automatically as part of the task.

To search, state the task **and the mechanism you think implements it**:

```bash
npx @servicenow/sdk explain "<task> with a <mechanism>" --format=raw
```

A query that only describes an outcome tends to match documents that merely discuss that outcome rather than the artifact that delivers it. You do not need the exact type name — a rough mechanism word is enough to pull the right topic up the ranking, and platform shorthand works best (`acl` beats "access control"). Skip the mechanism when the task already names the artifact, as in "run a job on a schedule".

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

Rule: ranked search output is for **choosing** a topic, never for answering. Each entry is a description plus a few truncated lines with the surrounding conditions, caveats, and required properties stripped out. Never write code from an excerpt or quote one back as guidance — once the search identifies the topic, read that topic in full.

Rule: a search phrase already returns each candidate's description, so `--peek` adds nothing after a search. Use `--peek` only when you reached a topic name by guesswork rather than from search results, to avoid opening the wrong full document.

### What to search for

- **Tasks plus mechanism** — "block a delete with a script", "restrict read access with an acl", "make a field mandatory with a policy"
- **Mechanism words worth adding** — `script`, `acl`, `role`, `policy`, `notification`, `schedule`, `flow`, `form`, `list`, `table`, `column`, `test`
- **Metadata types** — `BusinessRule`, `Table`, `Acl`, `Flow`, `ScriptInclude`, `ClientScript`, `UiPolicy`
- **Skills** — workflows like `build`, `transform`, `deploy`, `auth`
- **Conventions** — `naming`, `structure`, `scoping`, `file-layout`

### For any task — always start here

Step order: search with task + mechanism → discriminate from the descriptions → read every relevant topic in full. Fluent behavior is often split across multiple topics, so stopping at one risks an incomplete picture.

- Search: `npx @servicenow/sdk explain "<task> with a <mechanism>" --format=raw`
- Read every topic whose description fits: `npx @servicenow/sdk explain <topic-name> --format=raw`
- Follow cross-references — a guide routinely names further topics the search did not surface, and those are part of the answer.
- Read a guide together with its `*-api` reference; they usually rank adjacently. The guide gives the pattern and the pitfalls, the API topic the exact properties.
- Be suspicious of a top hit that merely repeats your wording. The characteristic failure is a document that shares vocabulary with the query but solves a different problem — confirm from the description that the topic produces the artifact you need.
- If nothing in the top 5 fits, search again naming a different mechanism, or use `--list`. Paging with `--range` on a bad query rarely helps.

### If explain fails

- `explain` is only available in `@servicenow/sdk` versions >= `4.6.0` — upgrade if the command is not found.
- `No matching topics for "<query>"` — nothing scored high enough; rephrase with a different mechanism word, or run `--list` to browse all topics.
- A query close to a topic name returns ranked suggestions instead of an error, so a near-miss or misspelled name is self-correcting — take the right name from the list and read that.
- An irrelevant result set does not mean the behavior is unsupported or unconstrained. The ranking always returns its nearest neighbours, so the absence of a matching topic is not evidence that no rule exists. Confirm from a document body before telling the user something is not supported.

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
