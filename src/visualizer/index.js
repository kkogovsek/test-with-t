import React from "react";
import styled from "styled-components";
import { ast } from "../lib";
import highlightBase from "../lib/highlightning/base";
import toJs from "../lib/converters/to-js";
import toT from "../lib/converters/to-t";

const button = (color, disabled) => ({ value }) => (
  <wired-button {...{ [color]: true }} disabled={disabled}>
    {value}
  </wired-button>
);

const Bindings = {
  keyword: button("keyword"),
  string: button("string"),
  operator: ({ value }) => <wired-checkbox checked>{value}</wired-checkbox>,
  builtin: button("builtin"),
  link: button("link"),
  "string-2": button("string-2"),
  tag: button("tag"),
  comment: button("comment"),
  error: button("error"),
  eof: () => null
};

function Line({ node, onClick }) {
  try {
    return (
      <div onClick={onClick}>
        <tline>
          {highlightBase[node.token].map((word, i) => {
            const Wo = Bindings[word];
            return <Wo key={i} value={node.params[i]} />;
          })}
        </tline>
        <tblock>
          {node.children && node.children.map(child => <Line node={child} />)}
        </tblock>
      </div>
    );
  } catch (e) {
    return null;
  }
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: white;
  display: flex;
  align-items: center;
`;

function Controls({ mode, setMode }) {
  return (
    <Container>
      <wired-button
        active={mode === "presentation"}
        onClick={() => setMode("presentation")}
      >
        presentation
      </wired-button>
      <wired-button
        active={mode === "document"}
        onClick={() => setMode("document")}
      >
        document
      </wired-button>
      <wired-button
        active={mode === "js output"}
        onClick={() => setMode("js output")}
      >
        js output
      </wired-button>
      <wired-button
        active={mode === "t editor"}
        onClick={() => setMode("t editor")}
      >
        t editor
      </wired-button>
    </Container>
  );
}

const Spacer = styled.div`
  width: 100%;
  height: 64px;
`;

function Document({ tree, onClick }) {
  return tree.map(node => <Line node={node} onClick={onClick} />);
}

function JsOutput({ tree }) {
  const code = React.useMemo(() => {
    return toJs(tree);
  }, [tree]);
  return <Sandbox js>{code}</Sandbox>;
}

function TEditor({ tree }) {
  const code = React.useMemo(() => {
    return toT(tree);
  }, [tree]);
  return <Sandbox>{code}</Sandbox>;
}

function Presentation({ tree }) {
  const [presentationCounter, setPresentationCounter] = React.useState(1);
  const shortTree = React.useMemo(() => {
    let count = 0;
    let traverse = root => {
      if (count < presentationCounter) {
        count++;
        let { children, ...props } = root;
        if (Array.isArray(children)) {
          return {
            ...props,
            children: children.map(traverse).filter(a => a)
          };
        } else {
          count++;
          return props;
        }
      }
      return null;
    };
    return tree.map(traverse);
  }, [tree, presentationCounter]);

  return (
    <Document
      onClick={() => setPresentationCounter(presentationCounter + 1)}
      tree={shortTree}
    />
  );
}

export default function visualize(strings, ...params) {
  const tree = ast(strings, ...params);
  return function Display() {
    const [mode, setMode] = React.useState("document");
    return (
      <>
        {mode === "document" && <Document tree={tree} />}
        {mode === "presentation" && <Presentation tree={tree} />}
        {mode === "js output" && <JsOutput tree={tree} />}
        {mode === "t editor" && <TEditor tree={tree} />}
        <Spacer />
        <Controls mode={mode} setMode={setMode} />
      </>
    );
  };
}
