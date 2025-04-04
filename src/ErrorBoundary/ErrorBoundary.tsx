import { PropsWithChildren } from "react";
import { ErrorBoundary as BaseErrorBoundary } from "react-error-boundary";
import { Container, Description, Title } from "./styled";

function ErrorBoundary({ children }: PropsWithChildren) {
  return (
    <BaseErrorBoundary
      fallback={
        <Container>
          <Title>Something went wrong...</Title>
          {/* ask to open an issue on the github repo */}
          <Description>Try to refresh the page</Description>
        </Container>
      }
    >
      {children}
    </BaseErrorBoundary>
  );
}

export default ErrorBoundary;
