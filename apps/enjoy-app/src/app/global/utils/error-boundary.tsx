import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  componentStack: string | null | undefined;
  resetError: () => void;
}

type FallbackCb = (props: ErrorFallbackProps) => React.ReactNode;

type Props = {
  fallback: FallbackCb;
  children: React.ReactNode | (() => React.ReactNode);
};

type State = {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      errorInfo: null,
      error: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  public render(): React.ReactNode {
    const { fallback } = this.props;
    const { error, errorInfo } = this.state;

    if (error) {
      if (React.isValidElement(fallback)) {
        return fallback;
      }

      if (typeof fallback === 'function') {
        return fallback({
          error,
          componentStack: errorInfo?.componentStack,
          resetError: () => this.setState({ error: null, errorInfo: null }),
        });
      }
      return null;
    }

    if (typeof this.props.children === 'function') {
      return this.props.children();
    }

    return this.props.children;
  }
}

function withErrorBoundary(
  component: React.ReactNode,
  fallback: (props: ErrorFallbackProps) => React.ReactNode,
  location: string,
  resetKey?: string,
) {
  return (
    <ErrorBoundary key={resetKey} fallback={fallback}>
      {component}
    </ErrorBoundary>
  );
}

export { ErrorBoundary, withErrorBoundary, ErrorFallbackProps };
