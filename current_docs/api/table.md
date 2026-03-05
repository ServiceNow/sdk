---
sidebar_label: Table
---

# Function: Table(table)

Creates a table in a scoped application (`sys_db_object`).

## Parameters

### table

`T & Table<S, E>`

an object containing the following properties:

**Properties:**

- **name** (required): `string`
  Name of the table. Must be lowercase and include the application scope

- **schema** (required): `S`
  Array of column references that define the table's schema

- **accessibleFrom** (optional): `'public' | 'package_private'`
  Application scopes that can access the table.

- **actions** (optional): `'read' | 'update' | 'delete' | 'create'[]`
  List of access options for the table.

- **allowClientScripts** (optional): `boolean`
  Indicates whether to allow design time configuration of client scripts on the table from other application scopes.

- **allowNewFields** (optional): `boolean`
  Indicates whether to allow design time configuration of new fields on the table from other application scope.

- **allowUiActions** (optional): `boolean`
  Indicates whether to allow design time configuration of UI Actions on the table from other application scopes.

- **allowWebServiceAccess** (optional): `boolean`
  Indicates whether web services can make calls to the table.

- **attributes** (optional): `Record<string, string | number | boolean>`
  Pairs of any supported dictionary attributes (sys_schema_attribute).

- **audit** (optional): `boolean`
  Indicates whether to track the creation, update, and deletion of all records in the table.

- **autoNumber** (optional): `object`
  Auto-numbering configuration for the table.
  - **number**: `number`

  - **numberOfDigits**: `number`

  - **prefix**: `string`


- **callerAccess** (optional): `'none' | 'tracking' | 'restricted'`
  Access level for cross-scope requests.

- **display** (optional): `string`
  Default display column. Use a column name from the schema.

- **extends** (optional): `E`
  The name of any other table on which this table is based.

- **extensible** (optional): `boolean`
  Indicates whether other tables can extend this table.

- **index** (optional): `object[]`
  A list of column references to generate indexes in the metadata XML of the table.

- **label** (optional): `string | Documentation[]`
  A unique label for the table on list and form views.

- **licensingConfig** (optional): `LicensingConfig`
  Configuration for table licensing.

- **liveFeed** (optional): `boolean`
  Indicates if live feeds are available for records in the table.

- **readOnly** (optional): `boolean`
  Indicates whether users can edit fields in the table.

- **scriptableTable** (optional): `boolean`
  Indicates whether the table is a remote table that uses data retrieved from an external source.

- **textIndex** (optional): `boolean`
  Indicates whether search engines index the text in a table.


## See

- https://docs.servicenow.com/csh?topicname=table-api-now-ts.html&version=latest


## Examples

### Add Column to Existing Table

Add a custom string column to the existing incident table

```typescript
/**
 * @title Add Column to Existing Table
 * @description Add a custom string column to the existing incident table
 */
import { StringColumn, Table } from '@servicenow/sdk/core'
export const incident = Table({
    name: 'incident' as any,
    schema: {
        x_tablesample_custom_column: StringColumn({
            label: 'Custom Column',
            maxLength: 40,
        }),
    },
})

```

### Table Extending Task

Create a table that extends task with auto-numbering and a reference column

```typescript
/**
 * @title Table Extending Task
 * @description Create a table that extends task with auto-numbering and a reference column
 */
import { ReferenceColumn, Table } from '@servicenow/sdk/core'
export const x_tablesample_extends = Table({
    name: 'x_tablesample_extends',
    extends: 'task',
    extensible: true,
    display: 'Extension Example Table',
    auto_number: {
        prefix: 'sample',
        number: 100,
        number_of_digits: 9,
    },
    schema: {
        user_reference_column: ReferenceColumn({
            mandatory: true,
            label: 'User Reference',
            referenceTable: 'sys_user',
        }),
    },
})

```

### Simple Table with Column Types

Create a table with string, integer, boolean, and date columns

```typescript
/**
 * @title Simple Table with Column Types
 * @description Create a table with string, integer, boolean, and date columns
 */
import { Table, StringColumn, IntegerColumn, BooleanColumn, DateColumn } from '@servicenow/sdk/core'
export const x_tablesample_name = Table({
    name: 'x_tablesample_name',
    schema: {
        string_column: StringColumn({ mandatory: true, label: 'String Column' }),
        integer_column: IntegerColumn({ mandatory: true, label: 'Integer Column' }),
        boolean_column: BooleanColumn({ mandatory: true }),
        date_column: DateColumn({ mandatory: true }),
    },
})

```
