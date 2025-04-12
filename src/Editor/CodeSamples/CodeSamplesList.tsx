import { codeSamples } from "./samples";
import { styled } from "@pigment-css/react";

const Container = styled("div")(({ theme }) => ({
  padding: theme.spacing.unit * 2,
  backgroundColor: "#1e1e1e",
  borderRight: "1px solid #333",
  minWidth: "200px",
}));

const Title = styled("h3")(({ theme }) => ({
  color: theme.colors.onPrimary,
  margin: `0 0 ${theme.spacing.unit * 2}px 0`,
  fontSize: "16px",
}));

const SampleButton = styled("button")<{ "data-selected"?: boolean }>(({ theme }) => ({
  display: "block",
  width: "100%",
  padding: `${theme.spacing.unit}px ${theme.spacing.unit * 1.5}px`,
  marginBottom: theme.spacing.unit,
  backgroundColor: "transparent",
  border: "1px solid #333",
  borderRadius: "4px",
  color: 'white',
  textAlign: "left",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#2d2d2d",
  },
  '&[data-selected="true"]': {
    backgroundColor: "#2d2d2d",
  },
}));

interface CodeSamplesListProps {
  onSelect: (code: string) => void;
  selectedCode?: string;
}

export default function CodeSamplesList({ onSelect, selectedCode }: CodeSamplesListProps) {
  return (
    <Container>
      <Title>Fluent Examples</Title>
      {codeSamples.map(([name, code]) => (
        <SampleButton
          key={name}
          data-selected={code === selectedCode}
          onClick={() => onSelect(code)}
        >
          {name}
        </SampleButton>
      ))}
    </Container>
  );
} 