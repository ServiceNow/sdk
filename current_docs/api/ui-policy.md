---
sidebar_label: UiPolicy
---

# Function: UiPolicy(config)

Creates a UI Policy that defines dynamic form behaviors to change field properties based on conditions.
UI  Policies can make fields mandatory, read-only, visible, hidden, or cleared when certain conditions are met.

## Parameters

### config

`UiPolicy<T>`

an object containing api properties:

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **shortDescription** (required): `string`
  A brief description of what the UI Policy does (required and must not be empty)

- **actions** (optional): `UiPolicyAction<T>[]`
  List of actions to perform when the UI Policy condition is met

- **active** (optional): `boolean`
  Whether the UI Policy is active

- **conditions** (optional): `string`
  A condition script or query that determines when the UI Policy applies

- **description** (optional): `string`
  Detailed description of the UI Policy

- **global** (optional): `boolean`
  Whether the UI Policy applies globally across all applications

- **inherit** (optional): `boolean`
  Whether the UI Policy is inherited by tables that extend this table

- **isolateScript** (optional): `boolean`
  Whether to run the script in an isolated scope

- **modelId** (optional): `string`
  Model ID for the UI Policy

- **modelTable** (optional): `T`
  Model table for the UI Policy

- **onLoad** (optional): `boolean`
  Whether the UI Policy runs when the form loads

- **order** (optional): `number`
  Order/priority of the UI Policy execution

- **relatedListActions** (optional): `UiPolicyRelatedListAction[]`
  List of related list visibility controls

- **reverseIfFalse** (optional): `boolean`
  Whether to reverse the actions when the condition is false (renamed from 'reverse' for clarity)

- **runScripts** (optional): `boolean`
  Whether to run the scripts defined in scriptTrue/scriptFalse

- **scriptFalse** (optional): `string`
  JavaScript code that runs when the condition evaluates to false

- **scriptTrue** (optional): `string`
  JavaScript code that runs when the condition evaluates to true

- **setValues** (optional): `string`
  Values to set when the UI Policy is applied

- **table** (optional): `T`
  The table to which the UI Policy applies (optional)

- **uiType** (optional): `uiType`
  User interface to which the UI Policy applies

- **view** (optional): `string | Record<'sys_ui_view'>`
  View context where the UI Policy applies (sys_ui_view reference or name).
  If global is true, the UI Policy applies to all form views.
  If global is false/undefined, specify a view to make the policy view-specific.


## See

- https://docs.servicenow.com/csh?topicname=ui-policy-api-now-ts.html&version=latest


## Examples

### Basic UI Policy

Create a minimal UI policy for a table

```typescript
/**
 * @title Basic UI Policy
 * @description Create a minimal UI policy for a table
 */
import { UiPolicy } from '@servicenow/sdk/core'

UiPolicy({
    $id: Now.ID['basic_policy'],
    table: 'incident',
    shortDescription: 'Basic UI Policy Test',
})

```

### UI Policy with Field Actions

Create a UI policy that controls field visibility, mandatory state, and read-only behavior

```typescript
/**
 * @title UI Policy with Field Actions
 * @description Create a UI policy that controls field visibility, mandatory state, and read-only behavior
 */
import { UiPolicy } from '@servicenow/sdk/core'

UiPolicy({
    $id: Now.ID['policy_with_actions'],
    table: 'incident',
    shortDescription: 'Policy with Actions',
    actions: [
        {
            field: 'priority',
            visible: false,
            mandatory: 'ignore',
            readOnly: 'ignore',
        },
        {
            field: 'urgency',
            visible: 'ignore',
            mandatory: true,
            readOnly: false,
        },
    ],
})

```

### UI Policy with Scripts

Create a UI policy with condition-based scripts and advanced options

```typescript
/**
 * @title UI Policy with Scripts
 * @description Create a UI policy with condition-based scripts and advanced options
 */
import { UiPolicy } from '@servicenow/sdk/core'

UiPolicy({
    $id: Now.ID['policy_with_scripts'],
    table: 'incident',
    shortDescription: 'Policy with Scripts',
    runScripts: true,
    uiType: 'desktop',
    scriptTrue: 'function onCondition() { g_form.addErrorMessage("Error"); }',
    scriptFalse: 'function onCondition() { g_form.clearMessages(); }',
    conditions: 'state=1',
    global: true,
    reverseIfFalse: true,
    isolateScript: true,
})

```
