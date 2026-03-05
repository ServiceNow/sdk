---
sidebar_label: SPWidgetDependency
---

# Function: SPWidgetDependency(config)

API used to create a Service Portal widget dependency (`sp_widget_dependency`). For
more information, see the docs.

## Parameters

### config

`SPWidgetDependency`

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **name** (required): `string`
  The name of the widget dependency (required)

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **angularModuleName** (optional): `string`
  The Angular module name for the widget dependency

- **cssIncludes** (optional): `CssIncludeWithOrder[]`
  An array of CSS includes for the widget dependency

- **includeOnPageLoad** (optional): `boolean`
  Whether the widget should be included on page load (default is false)

- **jsIncludes** (optional): `JsIncludeWithOrder[]`
  An array of JavaScript includes for the widget dependency

- **portalsForPageLoad** (optional): `string | Record<'sp_portal'>[]`
  An array of portals for the widget dependency



## Examples

### CSS Includes

Create CSS includes from external URLs or sp_css records with RTL support

```typescript
/**
 * @title CSS Includes
 * @description Create CSS includes from external URLs or sp_css records with RTL support
 */
import { CssInclude } from '@servicenow/sdk/core'

// CSS Include from URL
CssInclude({
    $id: Now.ID['bootstrap-css'],
    name: 'Bootstrap CSS',
    url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    rtlCssUrl: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css',
})

// CSS Include from sp_css with lazy loading
CssInclude({
    $id: Now.ID['custom-css'],
    name: 'Custom Portal CSS',
    spCss: 'ccfbb128f13494f68c570b646ba5d335',
    lazyLoad: true,
})

```

### JavaScript Includes

Create JS includes from external URLs or sys_ui_script records

```typescript
/**
 * @title JavaScript Includes
 * @description Create JS includes from external URLs or sys_ui_script records
 */
import { JsInclude } from '@servicenow/sdk/core'

// JS Include from URL
JsInclude({
    $id: Now.ID['chartjs-include'],
    name: 'Chart.js',
    url: 'https://cdn.jsdelivr.net/npm/chart.js',
})

// JS Include from sys_ui_script
JsInclude({
    $id: Now.ID['ui-script-include'],
    name: 'Custom UI Script',
    sysUiScript: '5f41b53498566648389c9b40286de458',
})

```

### Widget Dependency with JS and CSS

Create a widget dependency that bundles JavaScript and CSS includes

```typescript
/**
 * @title Widget Dependency with JS and CSS
 * @description Create a widget dependency that bundles JavaScript and CSS includes
 */
import { SPWidgetDependency, JsInclude, CssInclude } from '@servicenow/sdk/core'
const myJsInclude = JsInclude({
    $id: Now.ID['my-js-include'],
    name: 'My JS Include',
    url: 'https://cdn.example.com/script.js',
})

const myCssInclude = CssInclude({
    $id: Now.ID['my-css-include'],
    name: 'My CSS Include',
    url: 'https://cdn.example.com/style.css',
})

SPWidgetDependency({
    $id: Now.ID['my-dependency'],
    name: 'My Widget Dependency',
    angularModuleName: 'myModule',
    jsIncludes: [{ order: 100, include: myJsInclude }],
    cssIncludes: [{ order: 100, include: myCssInclude }],
})

```
