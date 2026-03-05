---
sidebar_label: UserPreference
---

# Function: UserPreference(config)

Creates a User Preference (sys_user_preference).

## Parameters

### config

`UserPreference`

an object containing the following properties:

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **name** (required): `string`
  Name of the feature or functionality

- **type** (required): `'string' | 'boolean' | 'image' | 'password2' | 'date_format' | 'integer' | 'choicelist' | 'time_format' | 'color' | 'uploaded_image' | 'password' | 'timezone' | 'short_string'`
  The data type of entry accepted for the `value`

- **value** (required): `string | number | boolean`
  Current setting for this record

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **description** (optional): `string`
  Short description of the feature or functionality

- **system** (optional): `boolean`
  Whether this record indicates the system-wide default


## See

- https://docs.servicenow.com/csh?topicname=c_UserPreferences.html&version=latest


## Examples

### Basic String Preference

Create a string user preference with a default value

```typescript
/**
 * @title Basic String Preference
 * @description Create a string user preference with a default value
 */
import { UserPreference } from '@servicenow/sdk/core'

UserPreference({
    $id: Now.ID['pref-id'],
    name: 'my-pref',
    type: 'string',
    value: 'hello world',
    description: 'this is the description',
    system: false,
})

```

### Boolean Preference

Create a boolean user preference for feature toggles

```typescript
/**
 * @title Boolean Preference
 * @description Create a boolean user preference for feature toggles
 */
import { UserPreference } from '@servicenow/sdk/core'

UserPreference({
    $id: Now.ID['bool-pref'],
    name: 'enable_notifications',
    type: 'boolean',
    value: 'true',
    description: 'Enable email notifications',
    system: false,
})

```

### System Preference

Create a system-level integer preference with default value

```typescript
/**
 * @title System Preference
 * @description Create a system-level integer preference with default value
 */
import { UserPreference } from '@servicenow/sdk/core'

UserPreference({
    $id: Now.ID['sys-pref'],
    name: 'default_page_size',
    type: 'integer',
    value: '20',
    description: 'Default number of records per page',
    system: true,
})

```
