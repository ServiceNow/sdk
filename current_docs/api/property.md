---
sidebar_label: Property
---

# Function: Property(config)

Creates a system property (`sys_properties`).

## Parameters

### config

`Property<T>`

an object containing the following properties:

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **name** (required): `string`
  Name of the property

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **choices** (optional): `string[]`
  Comma-separated values for a choice list

- **description** (optional): `string`
  A brief, descriptive phrase describing the function of the property

- **ignoreCache** (optional): `boolean`
  Determines whether to flush this property's value from all other server-side caches

- **isPrivate** (optional): `boolean`
  If true, exclude this property from being imported via update sets

- **roles** (optional): `object`
  The roles that have access to this property
  - **read**: `string | Role[]`

  - **write**: `string | Role[]`


- **type** (optional): `'' | T`
  Data type for the property

- **value** (optional): `string | number | boolean`
  The desired value for the property


## See

- https://docs.servicenow.com/csh?topicname=property-api-now-ts.html&version=latest


## Examples

### Basic System Property

Create a simple string property with minimal configuration

```typescript
/**
 * @title Basic System Property
 * @description Create a simple string property with minimal configuration
 */
import { Property } from '@servicenow/sdk/core'

Property({
    $id: Now.ID['test'],
    name: 'x_test.my_property',
    value: 'hello',
})

```

### Private Boolean Property

Create a private boolean property for feature flags

```typescript
/**
 * @title Private Boolean Property
 * @description Create a private boolean property for feature flags
 */
import { Property } from '@servicenow/sdk/core'
Property({
    $id: Now.ID['bool_prop'],
    name: 'x_test.enable_feature',
    type: 'boolean',
    value: 'true',
    description: 'Enable the new feature',
    isPrivate: true,
})

```

### Property with Role-Based Access

Create a property with read/write role restrictions and value choices

```typescript
/**
 * @title Property with Role-Based Access
 * @description Create a property with read/write role restrictions and value choices
 */
import { Property } from '@servicenow/sdk/core'

Property({
    $id: Now.ID['test'],
    name: 'x_test.my_property',
    type: 'string',
    value: 'hello',
    description: 'My property',
    choices: ['a', 'b', 'c'],
    ignoreCache: true,
    roles: {
        read: ['admin'],
        write: ['activity_admin'],
    },
})

```
