---
sidebar_label: CrossScopePrivilege
---

# Function: CrossScopePrivilege(config)

Creates a Cross Scope Privilege record (`sys_scope_privilege`).

## Parameters

### config

`CrossScopePrivilege`

an object containing the following properties:

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **operation** (required): `'read' | 'delete' | 'create' | 'execute' | 'write'`
  The operation being requested on the target.

- **status** (required): `'requested' | 'allowed' | 'denied'`
  The authorization status of the privilege request. Can be 'requested', 'allowed', or 'denied'.

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **targetName** (optional): `string`
  The name of the table, script include, or script object being requested.

- **targetScope** (optional): `string`
  The application scope whose resources are being requested.

- **targetType** (optional): `'sys_db_object' | 'sys_script_include' | 'scriptable'`
  The type of target being requested


## See

- https://docs.servicenow.com/csh?topicname=c_CrossScopePrivilegeRecord.html&version=latest


## Examples

### Execute Script Include Privilege

Allow executing a script include from another scope

```typescript
/**
 * @title Execute Script Include Privilege
 * @description Allow executing a script include from another scope
 */
import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['6d109a82ff54b210fd87ffffffffff8e'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'GlideQuery',
    targetScope: 'global',
    targetType: 'sys_script_include',
})

```

### Read Table Privilege

Allow reading records from a table in another scope

```typescript
/**
 * @title Read Table Privilege
 * @description Allow reading records from a table in another scope
 */
import { CrossScopePrivilege } from '@servicenow/sdk/core'
CrossScopePrivilege({
    $id: Now.ID['read_privilege'],
    operation: 'read',
    status: 'allowed',
    targetName: 'cmdb_ci_computer',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

```

### Write Table Privilege

Allow writing records to a table in another scope

```typescript
/**
 * @title Write Table Privilege
 * @description Allow writing records to a table in another scope
 */
import { CrossScopePrivilege } from '@servicenow/sdk/core'
CrossScopePrivilege({
    $id: Now.ID['write_privilege'],
    operation: 'write',
    status: 'allowed',
    targetName: 'incident',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

```
