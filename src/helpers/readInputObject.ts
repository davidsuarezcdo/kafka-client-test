import * as readline from "readline";
import { parseJsObject, parseJson } from "./parseJson";

export const readInputObject = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let jsonStr = "";
  let validJson = false;
  for await (const line of rl) {
    jsonStr += line.trim();

    if (!jsonStr) continue;
    if (jsonStr === "exit") process.exit(0);

    const jsonData = jsonStr.split("=");
    jsonStr = jsonData[jsonData.length - 1].trim();

    if (jsonStr[jsonStr.length - 1] === ";") {
      jsonStr = jsonStr.slice(0, -1);
    }
    validJson = parseJson(jsonStr) || parseJsObject(jsonStr);
    if (validJson || jsonStr[0] !== "{") break;
  }
  rl.close();
  return validJson;
};
