import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? <h3>Error occurred</h3> : this.props.children;
  }
}
