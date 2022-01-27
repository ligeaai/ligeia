import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";

import { BrowserRouter as Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./redux/store";
import App from "./components/app";

ReactDOM.render(
  // <StrictMode>
  <Router>
    <App />
  </Router>,
  // </StrictMode>,
  document.getElementById("root")
);
