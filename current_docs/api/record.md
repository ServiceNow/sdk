---
sidebar_label: Record
---

# Function: Record(record)

Create a record in any table. This is a low-level function typically used as
a fallback when the specific record type or metadata does not have its own
dedicated API. When possible, prefer using other, dedicated APIs to generate
metadata as those APIs will often have better type safety and will be easier
to use.

## Parameters

### record

`R & object & object & Meta`

an object containing the following properties:

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **data** (required): `Data<T>`
  Fields and their values in the table.

- **table** (required): `T`
  The table to which the record belongs.


## See

- https://docs.servicenow.com/csh?topicname=record-api-now-ts.html&version=latest


## Examples

### CMDB Computer Record

Create a CMDB configuration item for a computer

```typescript
/**
 * @title CMDB Computer Record
 * @description Create a CMDB configuration item for a computer
 */
import { Record } from '@servicenow/sdk/core'
Record({
    $id: Now.ID['cmdb-ci-computer-1'],
    table: 'cmdb_ci_computer',
    data: {
        asset_tag: 'ASSET001',
        assigned: '2024-04-21 07:00:00',
        category: 'Hardware',
        company: '31bea3d53790200044e0bfc8bcbe5dec',
        cost_center: '7fb1cc99c0a80a6d30c04574d14c0acf',
        cpu_manufacturer: '7aad6d00c611228400f00e0f80b67d2d',
        cpu_speed: 798,
        first_discovered: '2006-09-12 20:55:20',
        install_date: '2023-10-29 08:00:00',
        model_id: 'a9a2d0c3c6112276010db16c5ddd3461',
        name: 'Computer 1',
        os: 'Windows XP Professional',
        os_service_pack: 'Service Pack 3',
        os_version: '5.1',
        po_number: 'PO27711',
        ram: '1543',
        serial_number: 'L3BB911',
    },
})

```

### Custom Table Record

Create a record in a custom application table

```typescript
/**
 * @title Custom Table Record
 * @description Create a record in a custom application table
 */
import { Record } from '@servicenow/sdk/core'
Record({
    table: 'x_helloworld_tableone',
    $id: Now.ID['x_helloworld_tableone_record1'],
    data: {
        string_field: 'Hello World 1',
        datetime_field: '01-01-2024 12:00:00',
        integer_field: 1,
    },
})

```

### Incident Record

Create an incident record with detailed information

```typescript
/**
 * @title Incident Record
 * @description Create an incident record with detailed information
 */
import { Record } from '@servicenow/sdk/core'
Record({
    $id: Now.ID['incident-1'],
    table: 'incident',
    data: {
        number: 'INC0010001',
        active: true,
        short_description: 'This is a sample incident',
        description: 'This is a sample incident description',
        comments: 'This is a sample comment',
        cmdb_ci: '265e09dbeb584baf9c111a7148c99529',
        urgency: 1,
        activity_due: '2025-01-02 12:30:00',
        approval: 'not requested',
        caller_id: '77ad8176731313005754660c4cf6a7de',
        notify: 1,
        priority: 3,
        opened_at: '2025-01-01 12:30:00',
    },
})

```
