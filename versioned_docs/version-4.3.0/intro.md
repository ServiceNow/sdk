---
slug: /
sidebar_position: 1
---

# ServiceNow SDK API Reference

The ServiceNow SDK lets you develop applications in source code using **ServiceNow Fluent** — a domain-specific language for creating application metadata as code.

## What is ServiceNow Fluent?

ServiceNow Fluent provides a set of typed API functions that map directly to platform records. Instead of configuring records through the UI, you define them in TypeScript and deploy them with the SDK.

## Getting Started

Install the SDK:

```bash
npm install @servicenow/sdk
```

Import APIs from `@servicenow/sdk/core`:

```typescript
import { Acl, BusinessRule, Role } from '@servicenow/sdk/core'
```

## Available APIs

Browse the **API Reference** section in the sidebar for complete documentation on each available function.

## External Links

- [NPM Package](https://www.npmjs.com/package/@servicenow/sdk)
- [Official Documentation](https://www.servicenow.com/docs/r/application-development/servicenow-sdk/servicenow-sdk-landing.html)
- [SDK Examples](https://github.com/servicenow/sdk-examples)
- [Release Notes](https://github.com/servicenow/sdk/releases)
