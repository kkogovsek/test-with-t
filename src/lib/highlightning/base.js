const KW = "keyword";
const ST = "string";
const OP = "operator";
const BI = "builtin";
const URL = "link";
const ST2 = "string-2";
const PR = "tag";
const CM = "comment";
const ER = "error";

const tokenMap = {
  "nothing.space": null,
  "nothing.eol": null,
  suite: [BI, ST],
  macro: [ST2, BI],
  chain: [BI, ST2],
  test: [BI, ST2],
  bridge: [BI, ST2],
  eof: null,
  "step.bind": [OP, BI, ST, BI, ST],
  "step.reload": [OP, KW],
  "step.visit": [OP, KW],
  "step.click": [OP, KW, ST],
  "step.force_click": [OP, KW, KW, ST],
  "step.contains": [OP, ST, KW, ST],
  "step.input": [OP, KW, ST, KW, ST],
  "step.exists": [OP, KW, ST, KW],
  "step.capture_request": [OP, KW, KW, URL, ST],
  "step.wait": [OP, KW, KW, ST],
  "step.check_url": [OP, KW, KW, URL],
  "step.run_macro": [OP, KW, ST2],
  "step.run_chain": [OP, KW, ST, KW, ST2],
  "step.run_bridged": [OP, KW, ST2],
  "step.comment": [OP.CM, CM],
  "chain.call-0": [OP, PR],
  "chain.call-1": [OP, PR, ST],
  "chain.call-2": [OP, PR, ST, ST],
  "chain.call-3": [OP, PR, ST, ST, ST],
  "chain.call-4": [OP, PR, ST, ST, ST, ST],
  comment: [CM, CM],
  error: [ER, ER]
};

export default tokenMap;
