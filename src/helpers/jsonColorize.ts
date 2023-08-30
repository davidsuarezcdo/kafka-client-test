import chalk from "chalk";

export const objectToJsonColorized = (json: Record<any, any>) => {
  const jsonString = JSON.stringify(json, null, 2);

  console.log(
    jsonString
      .replace(/"(.*?)":/g, chalk.green('"$1":'))
      .replace(/: ".*?"/g, chalk.cyan(': "$&"'))
      .replace(/: (\d+)/g, chalk.magenta(": $1"))
  );

  return jsonString;
};
