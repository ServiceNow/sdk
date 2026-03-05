---
sidebar_label: UiAction
---

# Function: UiAction(config)

## Parameters

### config

`UiAction<T>`

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **name** (required): `string`
  name of the UI Action. It must be unique within the table

- **table** (required): `T`
  table on which UI Action appears

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **actionName** (optional): `string`
  unique string that can be referenced in scripts

- **active** (optional): `boolean`
  If true, the UI Action is enabled

- **client** (optional): `object`
  If client side script and related properties
  - **isClient**: `boolean`

  - **isUi11Compatible**: `boolean`

  - **isUi16Compatible**: `boolean`

  - **onClick**: `string`


- **comments** (optional): `string`
  text field used by developers and admins to add internal notes

- **condition** (optional): `string`
  A script or condition that determines whether the UI Action is visible.

- **excludeFromViews** (optional): `string[]`
  Specifies views from which UI action to be excluded
  TODO: Add support for sysid references

- **form** (optional): `object`
  UI action on form view and related properties
  - **showButton**: `boolean`

  - **showContextMenu**: `boolean`

  - **showLink**: `boolean`

  - **style**: `'primary' | 'destructive' | 'unstyled'`


- **hint** (optional): `string`
  a tooltip or hover text that appears when users hover their mouse pointer over

- **includeInViews** (optional): `string[]`
  Specifies views in which UI action to be included
  TODO: Add support for sysid references

- **isolateScript** (optional): `boolean`
  Checked, script in a UI Action runs in an isolated script

- **list** (optional): `object`
  UI action on list view and related properties
  - **showBannerButton**: `boolean`

  - **showButton**: `boolean`

  - **showContextMenu**: `boolean`

  - **showLink**: `boolean`

  - **showListChoice**: `boolean`

  - **showSaveWithFormButton**: `boolean`

  - **style**: `'primary' | 'destructive' | 'unstyled'`


- **messages** (optional): `string[]`
  messages field holds user facing messages or notification text that the UI Action may display when it executes

- **order** (optional): `number`
  Determines the order in which the UI Action appears. Lower values show first.

- **overrides** (optional): `string | Record<'sys_ui_action'>`
  Action being overridden by the current record

- **roles** (optional): `string | Role[]`
  stores roles associated with a UI Action, defining which users can see or execute that UI Action based on their roles
  TODO: Add support for sysid references

- **script** (optional): `string | object`
  Script runs automatically as part of the UI Action when the client calls it. Note:
  server module scripts (sys_module) can only be used on server-side UI Actions.

- **showInsert** (optional): `boolean`
  Checked, the UI Action appears in insert

- **showMultipleUpdate** (optional): `boolean`
  Checked, the UI Action appears in insert, update, query or update multiple(bulk edit) mode.

- **showQuery** (optional): `boolean`
  Checked, the UI Action appears in insert, update, query or update multiple(bulk edit) mode.

- **showUpdate** (optional): `boolean`
  Checked, the UI Action appears in update

- **workspace** (optional): `object`
  UI action on workspace configuration and related properties
  - **clientScriptV2**: `string`

  - **isConfigurableWorkspace**: `boolean`

  - **showFormButtonV2**: `boolean`

  - **showFormMenuButtonV2**: `boolean`




## Examples

### UI Action with Form and List Options

Create a comprehensive UI action with form buttons, list buttons, conditions, and custom styling

```typescript
/**
 * @title UI Action with Form and List Options
 * @description Create a comprehensive UI action with form buttons, list buttons, conditions, and custom styling
 */
import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['car_info'],
    table: 'x_uiactionsample_ts_custom_cars',
    actionName: 'Car Information',
    name: 'View car info',
    active: true,
    showInsert: true,
    showUpdate: true,
    hint: 'View car info',
    condition: "current.type == 'SUV'",
    form: {
        showButton: true,
        showLink: true,
        showContextMenu: false,
        style: 'destructive',
    },
    list: {
        showLink: true,
        style: 'primary',
        showButton: true,
        showContextMenu: false,
        showListChoice: false,
        showBannerButton: true,
        showSaveWithFormButton: true,
    },
    script: script`current.name = "updated by script";
current.update();`,
    roles: ['u_requestor'],
    order: 100,
})

```

### Client-Side UI Action

Create a UI action that executes client-side JavaScript with workspace compatibility

```typescript
/**
 * @title Client-Side UI Action
 * @description Create a UI action that executes client-side JavaScript with workspace compatibility
 */
import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['client_action'],
    table: 'incident',
    actionName: 'Confirm Action',
    name: 'Confirm before save',
    active: true,
    showUpdate: true,
    form: {
        showButton: true,
        style: 'primary',
    },
    client: {
        isClient: true,
        isUi11Compatible: true,
        isUi16Compatible: true,
    },
    workspace: {
        isConfigurableWorkspace: true,
        showFormButtonV2: true,
        clientScriptV2: `function onClick(g_form) {
            if (confirm('Are you sure you want to proceed?')) {
                g_form.submit();
            }
        }`,
    },
    order: 100,
})

```

### Simple Server-Side UI Action

Create a basic UI action with server-side script to update record state

```typescript
/**
 * @title Simple Server-Side UI Action
 * @description Create a basic UI action with server-side script to update record state
 */
import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['simple_action'],
    table: 'incident',
    actionName: 'Mark Resolved',
    name: 'Mark as Resolved',
    active: true,
    showUpdate: true,
    form: {
        showButton: true,
        style: 'primary',
    },
    script: script`current.state = 6; // Resolved
current.resolution_code = 'Solved (Permanently)';
current.update();
action.setRedirectURL(current);`,
})

```
