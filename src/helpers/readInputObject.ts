import * as readline from "readline";
import { parseJsObject, parseJson } from "./parseJson";

const parseLine = (line: string, isFirstLine: boolean) => {
  line = line
    .trim()
    .replace(/;\s*$/, "")
    .replace(/(const|var)(\s*)(\w*)(\s*)=/, "");

  return isFirstLine
    ? line
        .replace(/^("|')/, "")
        .replace(/("|')$/, "")
        .trim()
    : line;
};

export const readInputObject = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let output = "";
  let outputParsed = false;
  let isFirstLine = true;
  for await (const line of rl) {
    output += parseLine(line, isFirstLine);
    isFirstLine = false;

    if (!output) continue;
    if (output === "exit") process.exit(0);

    outputParsed = parseJson(output) || parseJsObject(output);
    if (outputParsed || output[0] !== "{") break;
  }
  rl.close();
  return outputParsed;
};
