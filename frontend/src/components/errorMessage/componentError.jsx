import React from "react";
import { Box } from "@mui/material";
export class ComponentError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Box>{this.props.errMsg}</Box>;
    }

    return this.props.children;
  }
}
