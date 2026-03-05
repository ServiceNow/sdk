---
sidebar_label: ScriptInclude
---

# Function: ScriptInclude(options)

Script includes are used to store JavaScript that runs on the server.
Create script includes to store JavaScript functions and classes for use by server scripts. Each script include defines either an object class or a function.

## Parameters

### options

`ScriptIncludeOptions`

An Object containing the properties of the Script Include

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **name** (required): `string`
  The name of the script include. If you are defining a class, this must match the name of the class, prototype, and type. If you are using a classless (on-demand) script include, the name must match the function name.

- **script** (required): `string`
  Defines the server side script to run when called from other scripts.
  The script must define a single JavaScript class or a global function. The class or function name must match the Name field.
  Consider using `Now.include()` to move the script to a separate js file

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **accessibleFrom** (optional): `'public' | 'package_private'`
  Sets which applications can access this script include (access field)
    - **public**: All application scopes

- **active** (optional): `boolean`
  Enable or disable the script include

- **apiName** (optional): ``${string}.${string}``
  The internal name of the Script Include. Used to call the Script Include from out-of-scope applications.  If not populated it will default to `{scope}.{name}`.

- **clientCallable** (optional): `boolean`
  The script include can be called from client-side scripts using GlideAjax.

- **description** (optional): `string`
  Documentation explaining the purpose and function of the Script Include

- **mobileCallable** (optional): `boolean`
  The script include is available to client scripts called from mobile devices.

- **protectionPolicy** (optional): `'read' | 'protected'`
  The policy determines whether someone can view or edit the script include after the application is installed on their instance.
    - **read**: Allow other application developers to see your script logic, but not to change it.
    - **protected**: Prevent other application developers from changing this script include.
    - **undefined** Allow other application developers to customize your script include.

- **sandboxCallable** (optional): `boolean`
  The script include is available to scripts invoked from the script sandbox, such as a query condition.



## Examples

### Script Include with External File

Create a script include with code in an external JavaScript file

```typescript
/**
 * @title Script Include with External File
 * @description Create a script include with code in an external JavaScript file
 */
import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['my-script-include'],
    name: 'MyScriptInclude',
    active: true,
    apiName: 'x_scriptincludes.MyScriptInclude',
    script: Now.include('../../server/ScriptInclude/MyScriptInclude.server.js'),
})

```

**MyScriptInclude.server.js**

```javascript
var MyScriptInclude = Class.create()
MyScriptInclude.prototype = {
    initialize: () => {},

    example: () => {
        //example of using another script include and getting type information
        const processor = new global.AbstractAjaxProcessor()
        gs.info('This is an example script include method')
    },

    type: 'MyScriptInclude',
}
```

### Client-Callable Script Include

Create an AJAX-enabled script include that can be called from client scripts

```typescript
/**
 * @title Client-Callable Script Include
 * @description Create an AJAX-enabled script include that can be called from client scripts
 */
import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['ajax-script-include'],
    name: 'AjaxHelper',
    active: true,
    apiName: 'x_myapp.AjaxHelper',
    clientCallable: true,
    script: script`var AjaxHelper = Class.create();
AjaxHelper.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getUserDisplayName: function() {
        var userId = this.getParameter('sysparm_user_id');
        var gr = new GlideRecord('sys_user');
        if (gr.get(userId)) {
            return gr.getDisplayValue('name');
        }
        return '';
    },

    type: 'AjaxHelper'
});`,
})

```

### Script Include with Inline Code

Create a utility script include with inline JavaScript methods

```typescript
/**
 * @title Script Include with Inline Code
 * @description Create a utility script include with inline JavaScript methods
 */
import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['inline-script-include'],
    name: 'UtilityHelper',
    active: true,
    apiName: 'x_myapp.UtilityHelper',
    script: script`var UtilityHelper = Class.create();
UtilityHelper.prototype = {
    initialize: function() {},

    formatDate: function(dateStr) {
        var gdt = new GlideDateTime(dateStr);
        return gdt.getDisplayValue();
    },

    isValidEmail: function(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    type: 'UtilityHelper'
};`,
})

```
