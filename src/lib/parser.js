import syntax from "./syntx";
import { throwPrettyError } from "./errors";

export default function tokenize(code) {
  let currentPosition = 0;
  let currentLine = 0;
  const lines = code.split("\n");
  let parsed = [];
  for (let line of lines) {
    let len = line.length;
    line = line.trimLeft();
    currentPosition += len - line.length;
    len = line.length;
    line = line.trimRight();
    let addAtTheEnd = len - line.length;
    // currentPosition = line.trimRight()
    let match;
    let matchedToken;
    for (let [token, re] of syntax) {
      match = new RegExp(`^${re}$`).exec(line);
      if (match) {
        code = code.substr(match[0].length + 1);
        currentPosition += match[0].length;
        matchedToken = token;
        break;
      }
    }
    if (!match) {
      parsed.push(["error", "error in", `'${line}'`]);
      parsed.push(["error", "you", `can fix it in T - Editor`]);
    } else if (match[0]) {
      let params = match.slice(1).filter((_, i) => i % 2 == 0);
      parsed.push([matchedToken, ...params]);
      currentPosition += addAtTheEnd;
    }
    currentLine++;
  }

  return parsed.filter(([token]) => token !== "nothing").concat([["eof"]]);
}
