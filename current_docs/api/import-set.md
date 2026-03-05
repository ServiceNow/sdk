---
sidebar_label: ImportSet
---

# Function: ImportSet(config)

Creates an Import Set: defines how rows in a staging/source table are transformed and loaded into a target table (`sys_transform_map`).

## Parameters

### config

`ImportSet`

an object containing the following properties:

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **name** (required): `string`
  Display name of the import set

- **sourceTable** (required): `keyof Tables`
  Source staging table name

- **targetTable** (required): `keyof Tables`
  Target table to insert/update records

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **active** (optional): `boolean`
  Whether this import set is active

- **copyEmptyFields** (optional): `boolean`
  Copy empty fields from source to target

- **createOnEmptyCoalesce** (optional): `boolean`
  Create new record if coalesce finds no match

- **enforceMandatoryFields** (optional): `'no' | 'onlyMappedFields' | 'allFields'`
  Mandatory field enforcement level
  - 'no': do not enforce target table mandatory fields during transform
  - 'onlyMappedFields': enforce mandatory only for fields you map in `fields`
  - 'allFields': enforce all target table mandatory fields; unmapped required fields must still be provided or the row will be rejected

- **fields** (optional): `object`
  Field mappings: targetField -> sourceField or configuration object.
  - Simple string: direct field mapping
  - Object: advanced mapping with transformations and options

- **order** (optional): `number`
  Execution order (lower numbers run first)

- **runBusinessRules** (optional): `boolean`
  Run business rules on target table

- **runScript** (optional): `boolean`

- **script** (optional): `string | ImportSetTransformMapFn`

- **scripts** (optional): `ImportSetScript[]`
  Transform scripts for various lifecycle hooks



## Examples

### Basic Import Set

Create a simple transform map for importing user data

```typescript
/**
 * @title Basic Import Set
 * @description Create a simple transform map for importing user data
 */
import { ImportSet } from '@servicenow/sdk/core'

ImportSet({
    $id: Now.ID['1cd7e04a2a92440c977b31236326f151'],
    name: 'Honda User Data Import Set',
    targetTable: 'sys_user',
    sourceTable: 'x_snc_employee_3am_honda_users_import',
    active: true,
    runScript: false,
})

```

### Import Set with Field Mapping

Create a transform map with custom field mappings and transformation scripts

```typescript
/**
 * @title Import Set with Field Mapping
 * @description Create a transform map with custom field mappings and transformation scripts
 */
import { ImportSet } from '@servicenow/sdk/core'

ImportSet({
    $id: Now.ID['1cd7e04a2a92440c977b31236326f151'],
    name: 'Honda User Data Import Set',
    targetTable: 'sys_user',
    sourceTable: 'x_snc_employee_3am_honda_users_import',
    active: true,
    fields: {
        first_name: {
            sourceField: 'first_name',
            sourceScript: `answer = (function transformEntry(source) {
    // Add your code here
    return source.first_name.toUpperCase();
})(source);`,
            useSourceScript: true,
        },
        last_name: {
            sourceField: 'last_name',
        },
        mobile_phone: {
            sourceField: 'mobile_number',
        },
    },
    runScript: false,
})

```

### Import Set with Transform Scripts

Create a transform map with onBefore validation scripts

```typescript
/**
 * @title Import Set with Transform Scripts
 * @description Create a transform map with onBefore validation scripts
 */
import { ImportSet } from '@servicenow/sdk/core'

ImportSet({
    $id: Now.ID['1cd7e04a2a92440c977b31236326f151'],
    name: 'Honda User Data Import Set',
    targetTable: 'sys_user',
    sourceTable: 'x_snc_employee_3am_honda_users_import',
    active: true,
    scripts: [
        {
            $id: Now.ID['5d5c371eb0624773893d0f128e80cff2'],
            when: 'onBefore',
            script: script`(function runTransformScript(source, map, log, target /*undefined until onAfter*/) {
    // Validate source data before import
    if (!source.first_name || !source.last_name) {
        ignore = true;
        log.error('Missing required name fields');
    }
})(source, map, log, target);`,
        },
    ],
    runScript: false,
})

```
