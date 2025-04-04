import MonacoEditor from "@monaco-editor/react";
import { useAtom } from "jotai";
import { EditorContainer } from "../styled";
import { Container, Title, Section } from "./styled";
import { outputAtom } from "../atoms";

function Settings() {
  const [output] = useAtom(outputAtom);

  return (
    <Container>
      <Title>Output</Title>
      <Section sx={{ height: "100%" }}>
        <EditorContainer>
          <MonacoEditor
            height="100%"
            value={output.map((file) => file.content).join("\n\n")}
            options={{
              automaticLayout: true,
              scrollbar: {
                alwaysConsumeMouseWheel: false,
              },
              readOnly: true,
              minimap: {
                enabled: false,
              },
            }}
            language="xml"
            theme="vs-dark"
            path="output.xml"
            keepCurrentModel
          />
        </EditorContainer>
      </Section>
    </Container>
  );
}

export default Settings;
