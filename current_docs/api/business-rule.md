---
sidebar_label: BusinessRule
---

# Function: BusinessRule(config)

Creates a Business Rule: logic that runs when database records are queried, updated,
inserted, or deleted (`sys_script`).

## Usage

```ts
BusinessRule({
    $id: Now.ID['br0'],
    action: ['update'],
    table: 'incident',
    name: 'LogStateChange',
    order: 100,
    when: 'after',
    active: true
})
```
## Parameters

### config

`BusinessRule<T>`

Configuration for the business rule

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **name** (required): `string`
  The name of the business rule

- **table** (required): `T`
  The table on which the business rule runs

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **abortAction** (optional): `boolean`
  Whether to abort the current database transaction

- **access** (optional): `'public' | 'package_private'`
  Is this rule accessible from all scopes or just this scope: Default: package_private

- **action** (optional): `'update' | 'delete' | 'query' | 'insert'[]`
  The database operations that trigger this business rule

- **active** (optional): `boolean`
  Whether the business rule is enabled

- **addMessage** (optional): `boolean`
  Whether to display a message when the business rule runs

- **changeFields** (optional): `boolean`
  Update reference fields. Default: false

- **clientCallable** (optional): `boolean`
  Is this rule callable by client scripts? Default: false

- **condition** (optional): `string`
  Script-based condition that must evaluate to true for the business rule to run

- **description** (optional): `string`
  Description of the business rule's purpose

- **executeFunction** (optional): `boolean`
  Automatically execute the function predefined for this type of business rule (onBefore, onAfter, etc). Default: false

- **filterCondition** (optional): `string`
  Condition-builder conditions that must be met for the business rule to run

- **message** (optional): `string`
  The message to display when add_message is true

- **order** (optional): `number`
  The execution order of the business rule (lower numbers execute first)

- **priority** (optional): `number`
  Sets priority value for async rules

- **protectionPolicy** (optional): `'read' | 'protected'`
  The policy determines whether someone can view or edit the business rule after the application is installed on their instance.
    - **read**: Allow other application developers to see your script logic, but not to change it.
    - **protected**: Prevent other application developers from changing this business rule.
    - **undefined** Allow other application developers to customize your business rule.

- **rest** (optional): `object`
  REST properties for rule
  - **method**: `string | Record<'sys_rest_message_fn'>`
    Reference to a HTTP Method

  - **methodText**: `string`

  - **service**: `string | Record<'sys_rest_message'>`
    Reference to a REST Message

  - **serviceText**: `string`

  - **variables**: `string`
    Rest Variables

  - **webService**: `boolean`
    (is_rest) Whether this rule is associated with an outbound REST. Default: false


- **roleConditions** (optional): `string | Role[]`
  Roles that the user must have for the business rule to execute

- **script** (optional): `string | object`
  The script to execute, receives current and previous GlideRecords as arguments.

- **setFieldValue** (optional): `string`
  Field values to set in the current record

- **when** (optional): `'before' | 'after' | 'async' | 'display' | 'async_deprecated'`
  When the business rule should be executed relative to the database transaction


## See

- https://docs.servicenow.com/csh?topicname=business-rule-api-now-ts.html&version=latest


## Examples

### Basic Business Rule Example

Create a business rule that runs after update on the incident table

```typescript
/**
 * @title Basic Business Rule Example
 * @description Create a business rule that runs after update on the incident table
 */

import { BusinessRule } from '@servicenow/sdk/core'

export const LogStateChangeExample = BusinessRule({
    $id: Now.ID['br0'],
    action: ['update'],
    table: 'incident',
    name: 'LogStateChange',
    order: 100,
    when: 'after',
    active: true,
})

```

### Before Insert Business Rule

Create a business rule that sets default values when a record is inserted

```typescript
/**
 * @title Before Insert Business Rule
 * @description Create a business rule that sets default values when a record is inserted
 */
import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['br1'],
    name: 'Sample Business Rule',
    active: true,
    table: 'sc_req_item',
    when: 'before',
    action: ['insert'],
    script: script`;(function executeRule(current, previous) {
        // Set default values on new records
        current.setValue('state', 1);
        current.setValue('priority', 4);
    })`,
})

```

### Business Rule with External Script

Create a business rule that uses an external JavaScript file for the script logic

```typescript
/**
 * @title Business Rule with External Script
 * @description Create a business rule that uses an external JavaScript file for the script logic
 */

import { BusinessRule } from '@servicenow/sdk/core'
import { logStateChange } from '../../server/BusinessRule/businessLogic'

export const LogIncidentStateChange = BusinessRule({
    $id: Now.ID['log_state_change'],
    table: 'incident',
    name: 'Log State Change',
    when: 'after',
    action: ['update'],
    script: logStateChange,
    active: true,
})

```

**businessLogic.ts**

```typescript
import { gs } from '@servicenow/glide'

export function logStateChange(current: any, previous: any) {
    const title = current.getValue('title')
    const currentState = current.getValue('state')
    const previousState = previous.getValue('state')
    gs.addInfoMessage(`"${title}" updated from "${previousState}" to "${currentState}"`)
}
```
