import React from "react";

window.Input = function Input({ children }) {
  const placeholder = React.Children.toArray(children)
    .map(c => c.toString())
    .join("");
  const ref = React.useRef();
  return <wired-button>{placeholder}</wired-button>;
};
