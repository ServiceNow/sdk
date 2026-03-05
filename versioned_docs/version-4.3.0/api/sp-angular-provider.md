---
sidebar_label: SPAngularProvider
---

# Function: SPAngularProvider(config)

API used to create a Service Portal Angular provider (`sp_angular_provider`). For
more information, see the docs.

## Parameters

### config

`SPAngularProvider`

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **name** (required): `string`
  The name of the Angular provider (required)

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **requires** (optional): `string | Record<'sp_angular_provider'> | SPAngularProvider[]`
  An array of angular providers required by this provider

- **script** (optional): `string`
  The script for the Angular provider

- **type** (optional): `AngularProviderType`
  The type of the Angular provider (default is 'directive')



## Examples

### Basic Angular Provider

Create a minimal Service Portal Angular provider

```typescript
/**
 * @title Basic Angular Provider
 * @description Create a minimal Service Portal Angular provider
 */
import { SPAngularProvider } from '@servicenow/sdk/core'

SPAngularProvider({
    $id: Now.ID['my_angular_provider'],
    name: 'myAngularProvider',
})

```

### Angular Provider Service

Create an Angular provider of type service with custom script

```typescript
/**
 * @title Angular Provider Service
 * @description Create an Angular provider of type service with custom script
 */
import { SPAngularProvider } from '@servicenow/sdk/core'

SPAngularProvider({
    $id: Now.ID['my_angular_provider'],
    name: 'myAngularProvider',
    script: '// my provider service',
    type: 'service',
})

```

### Angular Provider with Dependencies

Create an Angular provider that requires other providers

```typescript
/**
 * @title Angular Provider with Dependencies
 * @description Create an Angular provider that requires other providers
 */
import { SPAngularProvider } from '@servicenow/sdk/core'

const childProvider = SPAngularProvider({
    $id: Now.ID['3790304b16c4f94468b2932e79ca7364'],
    name: 'childProvider',
    script: '// child script',
    type: 'directive',
})

SPAngularProvider({
    $id: Now.ID['parent-provider-id'],
    name: 'myAngularProvider',
    requires: ['5f41b53498566648389c9b40286de458', childProvider],
})

```
