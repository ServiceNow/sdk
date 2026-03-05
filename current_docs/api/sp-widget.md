---
sidebar_label: SPWidget
---

# Function: SPWidget(config)

API used to create a Service Portal widget (`sp_widget`). For
more information, see the docs.

## Parameters

### config

`SPWidget<T>`

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **name** (required): `string`
  The name of the widget (required)

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **angularProviders** (optional): `string | Record<'sp_angular_provider'> | SPAngularProvider[]`
  Array of Angular providers for the widget

- **category** (optional): `'standard' | 'custom' | 'sample' | 'otherApplications' | 'knowledgeBase' | 'servicePortal' | 'serviceCatalog'`
  The category of the widget (default is 'custom')

- **clientScript** (optional): `string`
  The client script for the widget

- **controllerAs** (optional): `string`
  The controller for the widget (default is 'c')

- **customCss** (optional): `string`
  The custom CSS for the widget

- **dataTable** (optional): `Table`
  The data table for the widget (default is 'sp_instance')

- **demoData** (optional): `JsonSerializable`
  The demo data for the widget

- **dependencies** (optional): `string | SPWidgetDependency | Record<'sp_dependency'>[]`
  Array of widget dependencies

- **description** (optional): `string`
  The description of the widget

- **docs** (optional): `string | Record<'sp_documentation'>`
  The documentation for the widget

- **fields** (optional): `string | SystemColumns | keyof FullSchema<Table>[]`
  The fields for the widget

- **hasPreview** (optional): `boolean`
  Show the preview pane in the Service Portal editor

- **htmlTemplate** (optional): `string`
  The HTML template for the widget

- **id** (optional): `string`
  The unique id for the widget. Must contain alphanumeric, -, or _ characters

- **internal** (optional): `boolean`
  internal field used by ServiceNow developers

- **linkScript** (optional): `string`
  The link script for the widget (client-side)

- **optionSchema** (optional): `WidgetOption[]`
  The option schema for the widget

- **public** (optional): `boolean`
  Whether the widget is public

- **roles** (optional): `string | Role | Record<'sys_user_role'>[]`
  The roles that can access the widget

- **serverScript** (optional): `string`
  The server script for the widget

- **servicenow** (optional): `boolean`
  Built by ServiceNow. On build, can only be true if scope has sn_ or snc_ prefix

- **templates** (optional): `SPTemplate[]`
  Array of widget templates



## Examples

### Service Portal Widget with External Files

Create a widget with external client script, server script, HTML template, and CSS

```typescript
/**
 * @title Service Portal Widget with External Files
 * @description Create a widget with external client script, server script, HTML template, and CSS
 */
import { SPWidget } from '@servicenow/sdk/core'

// Chart.js dependency sys_id (ServiceNow-provided library)
const CHARTJS = 'a7a8754347011200ba13a5554ee4905c'

SPWidget({
    $id: Now.ID['sample-widget'],
    name: 'Sample Widget',
    id: 'sample-widget',
    clientScript: Now.include('../../server/SPWidget/sample-widget.client.js'),
    serverScript: Now.include('../../server/SPWidget/sample-widget.server.js'),
    htmlTemplate: Now.include('../../server/SPWidget/sample-widget.html'),
    customCss: Now.include('../../server/SPWidget/sample-widget.scss'),
    demoData: {
        data: {
            incidents: [99, 59, 80, 81, 56, 55, 40, 0, 5, 21, 11, 30],
        },
    },
    hasPreview: true,
    dependencies: [CHARTJS],
})

```

**sample-widget.client.js**

```javascript
function controller() {
    this.onClick = () => {
        console.log('Widget clicked')
    }
}
```

**sample-widget.server.js**

```javascript
;(() => {
    data.message = 'Hello from the widget server script'
})()
```

**sample-widget.html**

```javascript
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Sample Widget</h3>
  </div>
  <div class="panel-body">
    <p>Hello from the widget</p>
  </div>
</div>
```

**sample-widget.scss**

```javascript
.panel {
    margin: 10px;
    border-radius: 4px;
}

.panel-heading {
    background-color: #f5f5f5;
}

.panel-body {
    padding: 15px;
}
```

### Widget with Inline Content

Create a Service Portal widget with inline HTML template and scripts

```typescript
/**
 * @title Widget with Inline Content
 * @description Create a Service Portal widget with inline HTML template and scripts
 */
import { SPWidget } from '@servicenow/sdk/core'

SPWidget({
    $id: Now.ID['inline-widget'],
    name: 'Inline Widget',
    id: 'inline-widget',
    htmlTemplate: '<div class="panel">{{data.message}}</div>',
    serverScript: script`(function() {
        data.message = 'Hello from inline widget';
    })();`,
    clientScript: script`function() {
        c.onClick = function() {
            console.log('Widget clicked');
        };
    }`,
    hasPreview: false,
})

```

### Widget with Angular Providers

Create a Service Portal widget that uses custom Angular directives

```typescript
/**
 * @title Widget with Angular Providers
 * @description Create a Service Portal widget that uses custom Angular directives
 */
import { SPWidget, SPAngularProvider } from '@servicenow/sdk/core'

const myDirective = SPAngularProvider({
    $id: Now.ID['my-directive'],
    name: 'myDirective',
    type: 'directive',
    script: script`function myDirective() {
        return {
            restrict: 'E',
            template: '<span>Custom Directive</span>'
        };
    }`,
})

SPWidget({
    $id: Now.ID['widget-with-provider'],
    name: 'Widget with Provider',
    id: 'widget-with-provider',
    htmlTemplate: '<div><my-directive></my-directive></div>',
    serverScript: script`(function() {
        data.title = 'Widget with Angular Provider';
    })();`,
    angularProviders: [myDirective],
})

```
