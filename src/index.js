import React from "react";
import ReactDOM from "react-dom";

import "./lib/highlightning/codemirror";
import "./utils/sandbox";
import "./utils/Input";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
