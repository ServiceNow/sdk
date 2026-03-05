---
sidebar_label: ApplicationMenu
---

# Function: ApplicationMenu(config)

Creates an Application Menu (`sys_app_application`).

## Parameters

### config

`ApplicationMenu`

an object containing the following properties:

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **title** (required): `string`
  The label for the menu in the application navigator.

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **active** (optional): `boolean`
  Whether the menu is enabled.

- **category** (optional): `string | Record<'sys_app_category'>`
  The menu category that defines the navigation menu style.

- **description** (optional): `string`
  Additional information about what the application does.

- **hint** (optional): `string`
  The tooltip text that appears when a user hovers over the menu.

- **name** (optional): `string`
  An internal name to differentiate between applications with the same title.

- **order** (optional): `number`
  The relative position of the application menu in the application navigator.

- **roles** (optional): `string | Role[]`
  A list of `Role` objects or names of roles that can access the menu.


## See

-  - https://docs.servicenow.com/csh?topicname=app-menu-api-now-ts.html&version=latest
 - 



## Examples

### Basic Application Menu

Create an application menu with role-based access

```typescript
/**
 * @title Basic Application Menu
 * @description Create an application menu with role-based access
 */
import { ApplicationMenu, Role } from '@servicenow/sdk/core'

export const activity_admin = Role({
    name: 'x_appmenu.activity_admin',
    description: 'Activity admin role',
})

export const menu = ApplicationMenu({
    $id: Now.ID['My App Menu'],
    title: 'My App Menu',
    hint: 'This is a hint',
    description: 'This is a description',
    roles: [activity_admin],
    active: true,
})

```

### Multiple Application Menus

Create multiple application menus under the same category

```typescript
/**
 * @title Multiple Application Menus
 * @description Create multiple application menus under the same category
 */
import { ApplicationMenu, Record } from '@servicenow/sdk/core'

export const appCategory = Record({
    $id: Now.ID['sys_app_category_my_app'],
    table: 'sys_app_category',
    data: {
        name: 'My App Category',
        style: 'border: 1px solid #96bcdc; background-color: #FBFBFB;',
        default_order: 100,
    },
})

export const menu = ApplicationMenu({
    $id: Now.ID['My App Menu'],
    title: 'My App Menu',
    hint: 'This is a hint',
    description: 'This is a description',
    category: appCategory,
    active: true,
})

export const menu2 = ApplicationMenu({
    $id: Now.ID['Menu 2'],
    title: 'Menu 2',
    hint: 'hint 2',
    description: 'This is a description',
    category: appCategory,
    active: true,
})

```

### Application Menu with Category

Create an application menu linked to a custom category

```typescript
/**
 * @title Application Menu with Category
 * @description Create an application menu linked to a custom category
 */
import { ApplicationMenu, Record, Role } from '@servicenow/sdk/core'

export const appCategory = Record({
    $id: Now.ID['sys_app_category_my_app'],
    table: 'sys_app_category',
    data: {
        name: 'My App Category',
        style: 'border: 1px solid #96bcdc; background-color: #FBFBFB;',
        default_order: 100,
    },
})

export const activity_admin = Role({
    name: 'x_appmenu.activity_admin',
    description: 'my role description',
})

export const menu = ApplicationMenu({
    $id: Now.ID['My App Menu'],
    title: 'My App Menu',
    hint: 'This is a hint',
    description: 'This is a description',
    category: appCategory,
    roles: [activity_admin],
    active: true,
})

```
