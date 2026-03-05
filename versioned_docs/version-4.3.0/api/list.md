---
sidebar_label: List
---

# Function: List(config)

Creates a list view for tables (`sys_ui_list`)

## Parameters

### config

`List<T>`

an object containing the following properties:

**Properties:**

- **columns** (required): `string | ListElement<T> | TableSchemaDotWalk<T>[]`
  An array of columns in the table to display in the list

- **table** (required): `T`
  Name of the table for the list

- **view** (required): `string | Record<'sys_ui_view'>`
  The UI view (sys_ui_view) to apply to the list (reference record or name of the UI View)

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **parent** (optional): `unknown`
  The table on which the related list appears

- **relationship** (optional): `string | Record<'sys_relationship'>`
  The relationship to apply to the related list


## See

- https://docs.servicenow.com/csh?topicname=list-api-now-ts.html&version=latest


## Examples

### Basic List Configuration

Create a list layout for CMDB server records with a custom view

```typescript
/**
 * @title Basic List Configuration
 * @description Create a list layout for CMDB server records with a custom view
 */
import { Record, List } from '@servicenow/sdk/core'

const llama_task_view_1 = Record({
    table: 'sys_ui_view',
    $id: Now.ID['llama_task_view_1'],
    data: {
        name: 'llama_task_view_1',
        title: 'llama_task_view_1',
    },
})

List({
    $id: Now.ID['1'],
    table: 'cmdb_ci_server',
    view: llama_task_view_1,
    columns: [
        { element: 'name', position: 0 },
        { element: 'business_unit', position: 1 },
        { element: 'vendor', position: 2 },
        { element: 'cpu_type', position: 3 },
    ],
})

```

### Incident List Configuration

Create a list layout for incident records with common columns

```typescript
/**
 * @title Incident List Configuration
 * @description Create a list layout for incident records with common columns
 */
import { Record, List } from '@servicenow/sdk/core'
const incident_view = Record({
    table: 'sys_ui_view',
    $id: Now.ID['incident_view'],
    data: {
        name: 'incident_view',
        title: 'Incident View',
    },
})

// Create a list view for incidents
List({
    $id: Now.ID['incident_list'],
    table: 'incident',
    view: incident_view,
    columns: [
        { element: 'number', position: 0 },
        { element: 'short_description', position: 1 },
        { element: 'priority', position: 2 },
        { element: 'state', position: 3 },
        { element: 'assigned_to', position: 4 },
    ],
})

```

### Mobile List View

Create a minimal list layout for mobile devices with essential columns

```typescript
/**
 * @title Mobile List View
 * @description Create a minimal list layout for mobile devices with essential columns
 */
import { Record, List } from '@servicenow/sdk/core'
const mobile_view = Record({
    table: 'sys_ui_view',
    $id: Now.ID['mobile_incident_view'],
    data: {
        name: 'mobile_incident',
        title: 'Mobile Incident View',
    },
})

// Create a list for mobile view with minimal columns
List({
    $id: Now.ID['mobile_list'],
    table: 'incident',
    view: mobile_view,
    columns: [
        { element: 'number', position: 0 },
        { element: 'short_description', position: 1 },
        { element: 'state', position: 2 },
    ],
})

```
