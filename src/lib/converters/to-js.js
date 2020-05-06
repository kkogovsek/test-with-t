let noop = () => "";
function getFnName(originalName) {
  let trimmedName = originalName.trim();
  return trimmedName
    .replace(/\s+(\w)/g, match => match.trim().toUpperCase())
    .replace(/\./g, "___");
}

const getMacroName = name => getFnName(`__macro__${name}`);
const getChainName = name => getFnName(`__chain__${name}`);

let getString = name => `${JSON.stringify(name)}`;
let getSelector = name => {
  return getString(name);
};
let getElement = name => `cy.get(${getSelector(name)})`;
let getUrl = url => url;

const chainCall = ([, name, ...params]) =>
  `\n    .${name}(${params.map(p => getString(p)).join(", ")})`;

const tokens = {
  "nothing.space": noop,
  "nothing.eol": noop,
  suite: node => {
    const {
      children,
      params: [, name]
    } = node;
    return `describe('${name}', () => {\n${transformToJs(children)}\n}\n`;
  },
  macro: node => {
    const {
      children,
      params: [name]
    } = node;
    return `function ${getMacroName(name)} () {\n${transformToJs(
      children
    )}\n}\n`;
  },
  chain: node => {
    const {
      children,
      params: [, name]
    } = node;
    return `function ${getChainName(
      name
    )} (element) {\n  cy.get(element)${transformToJs(children)};\n}\n`;
  },
  test: node => {
    const {
      children,
      params: [, name]
    } = node;
    return `it('${name}', () => {\n  var server = false;\n${transformToJs(
      children
    )}}\n`;
  },
  bridge: ({ params: [, name] }) => `${name}();\n`,
  eof: node => "\n", // Always have a blank line at the end of file :D
  "step.bind": ([, , el, , alias]) =>
    `  cy.get(${getSelector(el)}).as(${getString(alias)});\n`,
  "step.reload": () => "  cy.reload();\n",
  "step.visit": ([, , url]) => `  cy.visit(${getString(url)});\n`,
  "step.click": ([, , el]) => `  ${getElement(el)}.click();\n`,
  "step.force_click": ([, , el]) =>
    `  ${getElement(el)}.click({ force: true });\n`,
  "step.contains": ([, el, , content]) =>
    `  ${getElement(el)}.contains(${getString(content)});\n`,
  "step.input": ([, , what, , where]) =>
    `  ${getElement(where)}.type(${getString(what)});\n`,
  "step.exists": ([, , el]) => `  ${getElement(el)}.should('exist');\n`,
  "step.capture_request": ([, , , url, method]) =>
    `  if (!server) { server = true; cy.server(); }\n  cy.route(${JSON.stringify(
      {
        method,
        url: `${getUrl(url)}`
      }
    )}).as(${getString(url)});\n`,
  "step.wait": ([, , , what]) => `  cy.wait(${getString(what)});\n`,
  "step.check_url": ([, , url]) =>
    `  cy.url().should('include', ${getUrl(url)});\n`,
  "step.run_macro": ([, , name]) => `  ${getMacroName(name)}();\n`,
  "step.run_chain": ([, , name, , el]) =>
    `  ${getChainName(name)}(${getSelector(el)});\n`,
  "step.run_bridged": ([, , name]) => `  bridge.${name}();\n`,
  "step.comment": ([, , comment]) => `  // ${comment}\n`,
  "chain.call-0": chainCall,
  "chain.call-1": chainCall,
  "chain.call-2": chainCall,
  "chain.call-3": chainCall,
  "chain.call-4": chainCall,
  comment: ([, comment]) => `// ${comment}\n`,
  error: ({ params: [, error] }) => `// error: ${error}\n`
};

export default function transformToJs(ast) {
  return ast
    .map(node => tokens[node.token](node.children ? node : node.params))
    .join("");
}
