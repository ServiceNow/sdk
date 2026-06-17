---
inclusion: manual
name: Now Sdk Query
description: Use when the user needs to look up live data from a ServiceNow instance during Fluent development — resolving sys_ids, inspecting table columns, checking existing records, fetching choice values, reading role or scope info, or verifying whether a record already exists.
---

## Getting started

Before using `now-sdk query`, verify it is available and read the full usage guide:

```bash
npx @servicenow/sdk query --help
npx @servicenow/sdk explain query --format=raw
```

`query` is **mandatory** for this skill and only available in `@servicenow/sdk` versions >= `4.8.0`. If the command is not found, check the installed version and inform user to upgrade to use this feature
