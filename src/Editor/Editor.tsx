import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useDebounceCallback, useMediaQuery } from "usehooks-ts";
import MonacoEditor from "@monaco-editor/react";
import { Container, EditorContainer } from "./styled";
import FluentOutput from "./FluentOutput";
import { outputAtom } from "./atoms";
import { Project } from "@servicenow/sdk/api/browser";
import { useEffect, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { compressStringGzip, decompressStringGzip } from "../utils/compression";
import CodeSamplesList from "./CodeSamples/CodeSamplesList";
import * as monaco from 'monaco-editor';

function Editor() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const setOutput = useSetAtom(outputAtom);
  const [defaultValue, setDefaultValue] = useState<string | undefined>();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const proj = useRef(() => {
    return new Project({
      config: {
        scope: "x_example",
        scopeId: "bc02656ca2ec41bb9e036a3c2c18ede5",
      },
      packageJson: {
        name: "test",
        version: "1.0.0",
      },
    });
  });

  const editorProps = {
    language: "typescript",
    theme: "vs-dark",
    path: `content.now.ts`,
    options: {
      automaticLayout: true,
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
    },
  };

  const handleChange = async (value: string | undefined) => {
    console.info("handleChange", value);
    if (!value) return;

    const sf = proj.current().addSourceFile("content.now.ts", value);

    const content = sf.getContent();
    const output = await sf.getOutput();

    const diagnostics = sf.getASTDiagnostics();
    diagnostics.forEach((d) => d.print(console));

    setOutput(output);
    setDefaultValue(value);

    proj.current().removeSourceFile(sf);

    const code = await compressStringGzip(content, true);
    const encodedCode = encodeURIComponent(code as string);

    console.info({ code, encodedCode });

    history.replaceState(
      { code: encodedCode },
      "ServiceNow Fluent Playground",
      `?code=${encodedCode}`
    );
  }

  const debouncedHandleChange = useDebounceCallback(
    handleChange,
    400
  );

  const handleSampleSelect = (code: string) => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
      handleChange(code);
    }
  };

  useEffect(() => {
    async function init(urlCode: string | undefined | null) {
      let finalCode = defaultcode;
      if (urlCode) {
        try {
          const blob = await decompressStringGzip(urlCode, true);

          finalCode = await blob.text();
        } catch (e) {
          console.error("Error decompressing code:", e);
          finalCode = defaultcode;
        }
      }

      handleChange(finalCode);
      setDefaultValue(finalCode);
    }
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    init(code);
  }, []);

  if (isDesktop) {
    return (
      <Container>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={15} maxSize={35}>
            <CodeSamplesList onSelect={handleSampleSelect} selectedCode={defaultValue} />
          </Panel>
          <PanelResizeHandle
            className="resize-handle"
            hitAreaMargins={{ fine: 5, coarse: 5 }}
          />
          <Panel>
            <EditorContainer>
              <MonacoEditor
                {...editorProps}
                defaultValue={defaultValue}
                onChange={debouncedHandleChange}
                onMount={(editor, m) => {
                  editorRef.current = editor;
                  m.languages.typescript.typescriptDefaults.setCompilerOptions({
                    ...m.languages.typescript.typescriptDefaults.getCompilerOptions(),
                    allowJs: false,
                    module: m.languages.typescript.ModuleKind.ESNext,
                    moduleResolution:
                      m.languages.typescript.ModuleResolutionKind.NodeJs,
                  });
                }}
              />
            </EditorContainer>
          </Panel>
          <PanelResizeHandle
            className="resize-handle"
            hitAreaMargins={{ fine: 5, coarse: 5 }}
          />
          <Panel defaultSize={30} minSize={20}>
            <FluentOutput />
          </Panel>
        </PanelGroup>
      </Container>
    );
  }

  return (
    <Container sx={{ flexDirection: "column", gap: 16 }}>
      <FluentOutput />
      <EditorContainer sx={{ minHeight: 900 }}>
        <MonacoEditor height="100%" {...editorProps} />
      </EditorContainer>
    </Container>
  );
}

export default Editor;

const defaultcode = `import { Record } from "@servicenow/sdk/core";

Record({
  $id: Now.ID["user-fred"],
  table: "sys_user",
  data: {
    first_name: "Fred",
    last_name: "Luddy",
    email: "fred.luddy@example.com",
    title: "Programmer"
  }
})`;
