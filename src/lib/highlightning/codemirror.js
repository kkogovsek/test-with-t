import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";
import CodeMirror from "codemirror/lib/codemirror.js";
import "codemirror/addon/mode/simple.js";
import "codemirror/mode/javascript/javascript";
import syntax from "../syntx";
import tokenMap from "./base";

const wrapTokens = tokens => {
  if (Array.isArray(tokens)) {
    return tokens.reduce((res, el, i, all) => {
      let addition = [el];
      if (i < all.length - 1) {
        addition.push(null);
      }
      return res.concat(addition);
    }, []);
  }
  return tokens;
};

function generateSyntax() {
  return syntax.map(([token, regex]) => ({
    regex,
    token: wrapTokens(tokenMap[token])
  }));
}

// eslint-disable-next-line no-undef
CodeMirror.defineSimpleMode("t", {
  // The start state contains the rules that are intially used
  start: [
    ...generateSyntax(),
    // JS Interop
    { regex: /\$\{/, token: "JS", mode: { spec: "javascript", end: /\}/ } }
  ]
});
