import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, color: "#fff", background: "#1a0000", fontFamily: "monospace", fontSize: 14, whiteSpace: "pre-wrap" }}>
          <h2 style={{ color: "#ff4444" }}>⚠ Runtime Error</h2>
          <p>{this.state.error.message}</p>
          <details style={{ marginTop: 16 }}>
            <summary style={{ cursor: "pointer", color: "#ff8888" }}>Stack trace</summary>
            <pre style={{ marginTop: 8, color: "#ffaaaa" }}>{this.state.error.stack}</pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
