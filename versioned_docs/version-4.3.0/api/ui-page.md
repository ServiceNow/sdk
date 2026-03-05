---
sidebar_label: UiPage
---

# Function: UiPage(config)

## Parameters

### config

`UiPage`

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **endpoint** (required): ``${string}.do``
  endpoint for the page, typically in the format `<scope_name>_<ui_page_name>.do`

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **category** (optional): `'catalog' | 'general' | 'homepages' | 'htmleditor' | 'kb' | 'cms'`
  select a category from one of these values : general, homepages, htmleditor, kb, cms, catalog'

- **clientScript** (optional): `string`
  client-side JavaScript that runs in the browser, such as functions called by buttons. It’s intended to handle any client-side processing needed, like setting focus to a field or other interactive DHTML features after a page is loaded.

- **description** (optional): `string`
  description about ui page

- **direct** (optional): `boolean`
  Select this check box for a direct UI page

- **html** (optional): `string`
  define what is rendered when the page is shown. It can contain either static XHTML, dynamically generated content defined as Jelly, or call script includes and UI Macros.

- **processingScript** (optional): `string | object`
  Script that runs on the server when the page is submitted



## Examples

### UI Page with External Files

Create a UI page that uses external HTML, client script, and processing script files

```typescript
/**
 * @title UI Page with External Files
 * @description Create a UI page that uses external HTML, client script, and processing script files
 */
import { UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['ui-page-sample'],
    category: 'general',
    endpoint: 'x_uipagesample_mypage.do',
    description: 'This is a sample UI Page created with the SDK',
    html: Now.include('../../server/UiPage/ui-page.html'),
    clientScript: Now.include('../../server/UiPage/ui-page.client-script.client.js'),
    processingScript: Now.include('../../server/UiPage/ui-page.processing-script.server.js'),
})

```

**ui-page.html**

```javascript
<g:ui_form>
  <p>Click OK to run the processing script.</p>
  <g:dialog_buttons_ok_cancel ok="return onSubmit()" />
  <input type="hidden" name="application_sys_id" value="499836460a0a0b1700003e7ad950b5da" />
</g:ui_form>
```

**ui-page.client-script.client.js**

```javascript
function onSubmit() {
    return true
}
```

**ui-page.processing-script.server.js**

```javascript
var application = new GlideRecord('hr_application')
application.get(application_sys_id)
application.status = 'Rejected'
application.update()
var urlOnStack = GlideSession.get().getStack().bottom()
response.sendRedirect(urlOnStack)
```

### UI Page with Inline Content

Create a UI page with inline HTML template and embedded client/processing scripts

```typescript
/**
 * @title UI Page with Inline Content
 * @description Create a UI page with inline HTML template and embedded client/processing scripts
 */
import { UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['inline-page'],
    category: 'general',
    endpoint: 'x_myapp_inline_page.do',
    description: 'UI Page with inline HTML and scripts',
    html: `<g:ui_form>
  <h1>Welcome to My Page</h1>
  <p>This is a simple UI page.</p>
  <g:dialog_buttons_ok_cancel ok="return onSubmit()" />
</g:ui_form>`,
    clientScript: script`function onSubmit() {
    return true;
}`,
    processingScript: script`gs.info('Processing script executed');
response.sendRedirect('incident_list.do');`,
})

```

### UI Page with React

Create a UI page that renders a custom client-side application built with React. The HTML import points to a client directory and is aliased to the build output in dist/static/ via the staticContentPaths config in now.config.json. The SDK bundles the client build output as source artifacts alongside the UI page record. See https://www.servicenow.com/docs/r/application-development/ui-development-react.html

```typescript
/**
 * @title UI Page with React
 * @description Create a UI page that renders a custom client-side application built with React. The HTML import points to a client directory and is aliased to the build output in dist/static/ via the staticContentPaths config in now.config.json. The SDK bundles the client build output as source artifacts alongside the UI page record. See https://www.servicenow.com/docs/r/application-development/ui-development-react.html
 */
import { UiPage } from '@servicenow/sdk/core'
import html from './client/index.html'

UiPage({
    $id: Now.ID['react-app'],
    endpoint: 'x_myapp_react.do',
    description: 'UI Page rendering a custom React application',
    html: html,
})

```

**index.html**

```typescript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="./app.tsx"></script>
</body>
</html>
```

### Simple UI Page

Create a minimal UI page with just HTML content

```typescript
/**
 * @title Simple UI Page
 * @description Create a minimal UI page with just HTML content
 */
import { UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['simple-page'],
    category: 'general',
    endpoint: 'x_myapp_simple.do',
    description: 'A simple UI page',
    html: `<h1>Hello World</h1>
<p>This is a simple page.</p>`,
})

```
