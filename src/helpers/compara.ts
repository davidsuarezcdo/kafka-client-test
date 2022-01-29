import chalk from "chalk";
import figlet from "figlet";

const compara_color_message = chalk.hex("#3e52ff");

export function welcome(message: string = "") {
  console.clear();
  console.log(compara_color_message(figlet.textSync("Compara", "Ogre")));
  if (message) {
    console.log(message);
  }
}
