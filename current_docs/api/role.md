---
sidebar_label: Role
---

# Function: Role(config)

Creates a new Role (`sys_user_role`)

## Parameters

### config

`Role & Meta`

an object containing the following properties:

**Properties:**

- **name** (required): `string`
  Name for the role beginning with the application scope in the format: `<scope>.<name>`.

- **assignableBy** (optional): `string`
  Other roles that can assign this role to users.

- **canDelegate** (optional): `boolean`
  Indicates if the role can be delegated to other users.

- **containsRoles** (optional): `string | Role[]`
  Other roles that this role contains.

- **description** (optional): `string`
  A description of what the role can access.

- **elevatedPrivilege** (optional): `boolean`
  Indicates whether manually accepting the responsibility of using the role before accessing its features is required.

- **grantable** (optional): `boolean`
  Indicates whether the role can be granted independently.

- **scopedAdmin** (optional): `boolean`
  Indicates whether the role is an Application Administrator role.


## See

- https://docs.servicenow.com/csh?topicname=role-api-now-ts.html&version=latest


## Examples

### Basic Role

Create a simple application role with description

```typescript
/**
 * @title Basic Role
 * @description Create a simple application role with description
 */
import { Role } from '@servicenow/sdk/core'

Role({
    name: 'x_myapp.activity_admin',
    description: 'Activity admin role for my application',
})

```

### Multiple Access Levels

Create viewer, editor, and admin roles for tiered permissions

```typescript
/**
 * @title Multiple Access Levels
 * @description Create viewer, editor, and admin roles for tiered permissions
 */
import { Role } from '@servicenow/sdk/core'
export const viewer = Role({
    name: 'x_myapp.viewer',
    description: 'Read-only access to application data',
})

export const editor = Role({
    name: 'x_myapp.editor',
    description: 'Can edit records in the application',
})

export const admin = Role({
    name: 'x_myapp.admin',
    description: 'Full administrative access',
})

```

### Role with ACL

Create a role and use it in an access control rule

```typescript
/**
 * @title Role with ACL
 * @description Create a role and use it in an access control rule
 */
import { Acl, Role } from '@servicenow/sdk/core'

export const sampleAdmin = Role({
    name: 'x_acl_sample.admin',
})

Acl({
    $id: Now.ID['create_acl'],
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'create',
    roles: [sampleAdmin, 'x_other_scope.manager'],
    table: 'x_acl_sample_table',
})

```
