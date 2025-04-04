import { Toaster } from "react-hot-toast";
import serviceNowLogo from "./assets/servicenow.svg";
import Editor from "./Editor";
import { Body, Container, Header } from "./styled";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Container>
        <Header>
          <img src={serviceNowLogo} alt="ServiceNow" height={32} />
          <h2>SDK Fluent Playground</h2>
        </Header>

        <Body>
          <Editor />
        </Body>
      </Container>
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
