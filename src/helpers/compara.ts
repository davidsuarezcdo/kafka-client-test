import chalk from "chalk";
import figlet from "figlet";

const comparaColorMessage = chalk.hex("#3e52ff");

export function welcome(message: string = "") {
  console.clear();
  console.log(comparaColorMessage(figlet.textSync("ComparaOnline", "Slant")));
  if (message) {
    console.log(message);
  }
}
