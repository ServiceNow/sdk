---
name: now-sdk-query
description: Use when working in a Fluent application (identified by a now.config.json at the project root) and the user needs live instance data — looking up a sys_id, inspecting table columns or schema, checking whether a record already exists, fetching choice values, or reading role or scope info.
argument-hint: "<table> --query '<encoded_query>' [options]"
---

## Getting started

Before using `now-sdk query`, verify it is available and read the full usage guide:

```bash
npx @servicenow/sdk query --help
npx @servicenow/sdk explain query --format=raw
```

`query` is **mandatory** for this skill and only available in `@servicenow/sdk` versions >= `4.8.0`. If the command is not found, check the installed version and inform user to upgrade to use this feature
