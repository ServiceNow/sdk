---
sidebar_label: RestApi
---

# Function: RestApi(api)

Creates endpoints, query parameters, and headers for a scripted REST service (`sys_ws_definition`).

## Parameters

### api

`RestApi<I, V>`

**Properties:**

- **$id** (required): `string | number | ExplicitKey<string>`

- **name** (required): `string`
  The name of the API, which is used in the API documentation.

- **$meta** (optional): `object`
  - **installMethod**: `'first install' | 'demo'`
    Map a record to an output folder that loads only in specific circumstances.
    'first install' - > 'unload',
    'demo' -> 'unload.demo'


- **active** (optional): `boolean`
  Indicates whether the API can serve requests

- **consumes** (optional): `string`
  A list of media types that resources of the API can consume

- **docLink** (optional): `string`
  A URL that links to static documentation about the API

- **enforceAcl** (optional): `string | Acl<unknown>[]`
  A list of ACLs to enforce when accessing resources (`sys_security_acl`)

- **policy** (optional): `'' | 'read' | 'protected'`
  The policy for how application files are protected when downloaded or installed

- **produces** (optional): `string`
  A list of media types that resources of the API can produce

- **routes** (optional): `Routes & object[] | Routes[]`
  The resources (`sys_ws_operation`) for the API

- **serviceId** (optional): `string`
  The API identifier used to distinguish this API in URI paths. It must be unique within the API namespace

- **shortDescription** (optional): `string`
  A brief description of the API, which is used in the API documentation

- **versions** (optional): `Version<I>[]`
  A list of versions (`sys_ws_version`) for the API


## See

- https://docs.servicenow.com/csh?topicname=scripted-rest-api-api-now-ts.html&version=latest


## Examples

### CRUD REST API

Create a REST API with GET, PUT, and DELETE operations

```typescript
/**
 * @title CRUD REST API
 * @description Create a REST API with GET, PUT, and DELETE operations
 */
import { RestApi } from '@servicenow/sdk/core'
RestApi({
    $id: Now.ID['restapi-crud'],
    name: 'CRUD REST API',
    serviceId: 'restapi_crud',
    consumes: 'application/json',
    routes: [
        {
            $id: Now.ID['restapi-crud-get'],
            name: 'get',
            method: 'GET',
            script: script`
              (function process(request, response) {
                response.setBody({ message: 'GET request' })
              })(request, response)
            `,
        },
        {
            $id: Now.ID['restapi-crud-put'],
            name: 'put',
            method: 'PUT',
            script: script`
              (function process(request, response) {
                var reqbody = request.body.dataString;
                var parser = new global.JSON();
                var parsedData = parser.decode(reqbody);
                response.setBody({ put: parsedData })
              })(request, response)
            `,
        },
        {
            $id: Now.ID['restapi-crud-delete'],
            name: 'delete',
            method: 'DELETE',
            script: script`
              (function process(request, response) {
                response.setBody({ delete: { msg: "DELETED" } })
              })(request, response)
            `,
        },
    ],
})

```

### Simple REST API

Create a REST API with GET and POST routes using inline scripts

```typescript
/**
 * @title Simple REST API
 * @description Create a REST API with GET and POST routes using inline scripts
 */
import { RestApi } from '@servicenow/sdk/core'
RestApi({
    $id: Now.ID['restapi-hello'],
    name: 'rest api fluent sample',
    serviceId: 'restapi_hello',
    consumes: 'application/json',
    routes: [
        {
            $id: Now.ID['restapi-hello-get'],
            name: 'get',
            method: 'GET',
            script: script`
              (function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
                response.setBody({ message: 'Hello, World!' })
              })(request, response)
            `,
        },
        {
            $id: Now.ID['restapi-hello-post'],
            name: 'post',
            method: 'POST',
            script: script`
              (function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
                var reqbody = request.body.dataString;
                var parser = new global.JSON();
                var parsedData = parser.decode(reqbody);
                response.setBody({ post: parsedData })
              })(request, response)
            `,
        },
    ],
})

```

### REST API with Module Handler

Create a REST API that uses an imported TypeScript module for the route handler

```typescript
/**
 * @title REST API with Module Handler
 * @description Create a REST API that uses an imported TypeScript module for the route handler
 */
import { RestApi } from '@servicenow/sdk/core'
import { process } from '../../server/RestApi/rest-api-handler'
RestApi({
    $id: Now.ID['restapi-modules'],
    name: 'rest api fluent modules sample',
    serviceId: 'restapi_modules',
    consumes: 'application/json',
    routes: [
        {
            $id: Now.ID['restapi-modules-get'],
            name: 'get',
            method: 'GET',
            script: process,
        },
    ],
})

```

**rest-api-handler.ts**

```typescript
import { gs } from '@servicenow/glide'

export function process(request: any, response: any) {
    gs.info('Processing REST API request')
    response.setBody({ message: 'Hello from module!' })
}
```
