import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import styled from "styled-components";

const StyledCodeMirror = styled(CodeMirror)`
  max-height: 1000px;
`;

window.Sandbox = function Sandbox({ children, js }) {
  const initialCode = React.Children.toArray(children)
    .map(c => c.toString())
    .join("");
  const [code, setCode] = React.useState(initialCode);
  React.useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);
  return (
    <StyledCodeMirror
      key={code}
      value={code}
      options={{
        mode: js ? "javascript" : "t",
        theme: "neat"
      }}
      onBeforeChange={(editor, data, value) => {
        setCode(value);
      }}
      onChange={(editor, value) => {}}
    />
  );
};
