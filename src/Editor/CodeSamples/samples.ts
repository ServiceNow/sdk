export type CodeSample = [string, string];

export const codeSamples: CodeSample[] = [
  [
    "User Record",
    `import { Record } from "@servicenow/sdk/core";

Record({
  $id: Now.ID["user-fred"],
  table: "sys_user",
  data: {
    first_name: "Fred",
    last_name: "Luddy",
    email: "fred.luddy@example.com",
    title: "Programmer"
  }
})`
  ],
  [
    "Business Rule",
    `import '@servicenow/sdk/global'
import { BusinessRule } from "@servicenow/sdk/core";

BusinessRule({
    $id: Now.ID['br1'],
    name: 'Sample Business Rule',
    active: true,
    table: 'sc_req_item',
    when: 'before',
    script: script\`
      (function executeRule(current, previous) {
        gs.log('Hello world!');
      })
    \`,
})`
  ],
  [
    'List',
    `import { Record } from '@servicenow/sdk/core'
import { List } from '@servicenow/sdk/core'

const llama_task_view_1 = Record({
    table: 'sys_ui_view',
    $id: Now.ID['llama_task_view_1'],
    data: {
        name: 'llama_task_view_1',
        title: 'llama_task_view_1',
    },
})

List({
    $id: Now.ID['1'],
    table: 'cmdb_ci_server',
    view: llama_task_view_1,
    columns: [
        { element: 'name', position: 0 },
        { element: 'business_unit', position: 1 },
        { element: 'vendor', position: 2 },
        { element: 'cpu_type', position: 3 },
    ],
})`
  ],
  [
    'REST API',
    `import { RestApi } from '@servicenow/sdk/core'

/**
 * This is a simple example of a REST API build using fluent that has 4 routes (GET, POST, PUT, DELETE)
 * /api/restapi-hello
 */

RestApi({
    $id: Now.ID['restapi-hello'],
    name: 'rest api fluent sample',
    service_id: 'restapi_hello',
    consumes: 'application/json',
    routes: [
        {
            $id: Now.ID['restapi-hello-get'],
            name: 'get',
            method: 'GET',
            script: script\`
              (function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
                response.setBody({ message: 'Hello, World!' })
              })(request, response)
            \`,
        },
        {
            $id: Now.ID['restapi-hello-post'],
            name: 'post',
            method: 'POST',
            script: script\`
              (function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
				            var reqbody = request.body.dataString;
                    var parser = new global.JSON();
                    var parsedData = parser.decode(reqbody);
                    
                    response.setBody({ post: parsedData })
              })(request, response)
            \`,
        },
        {
            $id: Now.ID['restapi-hello-put'],
            name: 'put',
            method: 'PUT',
            script: script\`
              (function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
                var reqbody = request.body.dataString;
                var parser = new global.JSON();
                var parsedData = parser.decode(reqbody);
                
                response.setBody({ put: parsedData })
              })(request, response)
            \`,
        },
        {
            $id: Now.ID['restapi-hello-delete'],
            name: 'delete',
            method: 'DELETE',
            script: script\`
              (function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
                response.setBody({ delete: { msg: "DELETED" } })
              })(request, response)
            \`,
        },
    ],
})`
  ],
  [
    'Simple Table',
    `import { Table, StringColumn, IntegerColumn, BooleanColumn, DateColumn } from '@servicenow/sdk/core'

/**
 * This example creates a table in the ServiceNow platform with 4 columns.
 */
export const x_tablesample_name = Table({
    name: 'x_tablesample_name',
    schema: {
        string_column: StringColumn({ mandatory: true, label: 'String Column' }),
        integer_column: IntegerColumn({ mandatory: true, label: 'Integer Column' }),
        boolean_column: BooleanColumn({ mandatory: true }),
        date_column: DateColumn({ mandatory: true }),
    },
})`
  ],
  [
    'Table with Index',
    `import { BooleanColumn, DateTimeColumn, StringColumn, ReferenceColumn, Table } from '@servicenow/sdk/core'

export const x_tablesample_index = Table({
    name: 'x_tablesample_index',
    schema: {
        name: StringColumn({
            label: 'Name',
            mandatory: true,
        }),
        color: StringColumn({
            label: 'Color',
            dropdown: 'suggestion',
            mandatory: true,
            choices: {
                white: { label: 'White' },
                brown: { label: 'Brown' },
                black: { label: 'Black' },
            },
        }),
        active: BooleanColumn({ mandatory: false, label: 'Active', read_only: false, active: true, default: true }),
        owner: ReferenceColumn({
            mandatory: true,
            label: 'User',
            read_only: false,
            active: true,
            referenceTable: 'sys_user',
        }),
        sys_created_by: StringColumn({
            mandatory: false,
            label: 'Created by',
            read_only: false,
            active: true,
            maxLength: 40,
            dropdown: 'none',
        }),
        sys_created_on: DateTimeColumn({ mandatory: false, label: 'Created', read_only: false, active: true }),
    },
    display: 'name',
    index: [{ element: 'color', name: 'color_index', unique: false }],
})`
  ],
  [
    'Extending the Task Table',
    `import { ReferenceColumn, Table } from '@servicenow/sdk/core'

/**
 * This example creates a table in the ServiceNow platform that extends the task table, and has a reference colun
 */
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
})`
  ],
  [
    'Simple ATF Test',
    `import { Test } from '@servicenow/sdk/core'

export default Test(
    {
        $id: Now.ID['fail-description'],
        active: true,
        description:
            'A test that fails because the field "Description" has a value that does not match what we assert it to be',
        name: 'Fails Because an Assert Fails',
    },
    (atf) => {
        atf.server.impersonate({  $id: 'step1', user: 'd8f57f140b20220050192f15d6673a98' })
        atf.form.openNewForm({  $id: 'step2', table: 'sc_task', view: '', formUI: 'standard_ui' })
        atf.form.setFieldValue({
            $id: 'step3',
            fieldValues: {
                short_description: 'This is a task',
                description: 'About all the tasks that need to be discussed',
            },
            formUI: 'standard_ui',
            table: 'sc_task',
        })
        atf.form.fieldValueValidation({
            $id: 'step4',
            conditions: 'description=This is a different message than the one I just set^EQ',
            formUI: 'standard_ui',
            table: 'sc_task',
        })
        atf.form.submitForm({  $id: 'step5', formUI: 'standard_ui', assert: '' })
    }
)`
  ],
  [
    'ATF Test with REST call',
    `import { Test } from '@servicenow/sdk/core'

export default Test(
    {
        $id: 'a29a37229f703200ef4afa7dc67fcf9e',
        active: true,
        description:
            \`Create an incident and retrieve it via REST Table API.\r\n\r\n***IMPORTANT***\r\nPlease create/select basic auth profile for Send REST Request - Inbound test step to run the test\`,
        name: 'Get Newly Created Resource via REST API Test',
    },
    (atf) => {
        atf.server.recordInsert({ 
            $id: 'step1',
            assert: 'record_successfully_inserted',
            enforceSecurity: false,
            fieldValues: { short_description: 'REST Test Incident' },
            table: 'incident',
        })
        atf.rest.sendRestRequest({
            $id: 'step2',
            basicAuthentication: '',
            body: '',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            method: 'get',
            path: "/api/now/v2/table/incident/{{step['d42bb7229f703200ef4afa7dc67fcf46'].record_id}}",
            queryParameters: {},
        })
        atf.rest.assertStatusCode({  $id: 'step3', operation: 'equals', statusCode: 200 })
        atf.rest.assertResponseJSONPayloadIsValid({ $id: 'step4',})
        atf.rest.assertJsonResponsePayloadElement({ 
            $id: 'step5',
            elementName: '/result/short_description',
            elementValue: 'REST Test Incident',
            operation: 'equals',
        })
    }
)`
  ],
  [
    'ATF Test with Query',
    `import { Test } from '@servicenow/sdk/core'

export default Test(
    {
        $id: '132888e4731030104a905ee515f6a74e',
        active: true,
        description:
            'This test validates that AWA Service Channels, Queues and their related records are configured in a way that should allow routing and assignment to run smoothly.',
        name: 'AWA: Check Configuration',
    },
    (atf) => {
        atf.server.recordQuery({ $id: 'step1',
            assert: 'records_match_query',
            enforceSecurity: false,
            fieldValues: 'active=true^EQ',
            table: 'awa_service_channel',
        })
    }
)`
  ],
  [
    'ATF Test with Output Variables',
    `import { Test } from '@servicenow/sdk/core'

/**
 * This example of an ATF Test uses an output variable to be used in subsequent steps
 */

Test(
    {
        active: true,
        failOnServerError: true,
        name: 'Simple example',
        description: 'An illustrative test written in fluent',
        $id: Now.ID[1],
    },
    (atf) => {
        atf.form.openNewForm({ $id: 'step1', table: 'incident', view: '', formUI: 'standard_ui' })
        atf.form.setFieldValue({ $id: 'step2', fieldValues: { short_description: 'test' }, formUI: 'standard_ui', table: 'incident' })
        const step3 = atf.form.submitForm({ $id: 'step3', formUI: 'standard_ui', assert: 'form_submitted_to_server' })
        atf.form.openExistingRecord({ $id: 'step4',
            formUI: 'standard_ui',
            recordId: step3.record_id,
            selectedTabIndex: 1,
            table: 'incident',
            view: '',
        })
        atf.server.log({ $id: 'ste5', log: \`Finished opening a record with \${step3.record_id} as an id\` })
    }
)`
  ],
  [
    'ATF Test with Impersonation',
    `import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['form-view-impersonate-test'],
        active: true,
        description:
            "A form that impersonates the user 'ATF User', and then uses the optional \"form view\" field of the 'open a new form' step to open a new 'User' form to its \"itil\" view, and then perform some actions on it.",
        name: 'Open a Form To a Specific View',
    },
    (atf) => {
        atf.server.impersonate({ $id: 'step1', user: 'd8f57f140b20220050192f15d6673a98' })
        atf.form.openNewForm({  $id: 'step2', table: 'sys_user', view: 'itil', formUI: 'standard_ui' })
        atf.form.fieldValueValidation({  $id: 'step3', conditions: 'first_name=^EQ', formUI: 'standard_ui', table: 'sys_user' })
        atf.form.fieldStateValidation({
            $id: 'step4',
            formUI: 'standard_ui',
            mandatory: [],
            notMandatory: ['title'],
            notReadOnly: [],
            notVisible: [],
            readOnly: [],
            table: 'sys_user',
            visible: [],
        })
        atf.form.setFieldValue({  $id: 'step5', fieldValues: { title: 'Senior Developer' }, formUI: 'standard_ui', table: 'sys_user' })
        atf.form.submitForm({  $id: 'step6', formUI: 'standard_ui' })
    }
)`
  ]
];