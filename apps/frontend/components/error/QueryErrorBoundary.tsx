import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

interface QueryErrorBoundaryProps {
  children: React.ReactNode;
  errorFallback: React.FC<{
    error: Error;
    resetErrorBoundary: (...args: unknown[]) => void;
  }>;
}

export default function QueryErrorBoundary({
  children,
  errorFallback: ErrorFallback,
}: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorFallback
              error={error as Error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
