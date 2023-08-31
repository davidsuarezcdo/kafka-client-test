import chalk from "chalk";

export const objectToJsonColorized = (json: Record<any, any>) => {
  const jsonString = JSON.stringify(json, null, 2);

  return jsonString
    .replace(/"(.*?)":/g, chalk.green('"$1":'))
    .replace(/: ".*?"/g, chalk.cyan(': "$&"'))
    .replace(/: (\d+)/g, chalk.magenta(": $1"));
};
