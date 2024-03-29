import { Command } from "commander";
import { welcome } from "./helpers/compara";
import Consumer from "./commands/Consumer";
import Producer from "./commands/Producer";
import fs from "fs";
import path from "path";
import loadConfig from "./helpers/loadConfig";

loadConfig(path.resolve(__dirname, "../.env"));
const program = new Command();

program.version("0.1.0").description("Kafka CLI");

program
  .command("consumer <...topic>")
  .description("Consume mensajes de un topico")
  .alias("c")
  .action((_arg, _conf, command) => {
    welcome();
    Consumer(command.args);
  });

program
  .command("producer <topic>")
  .description("Produce mensajes a un topico")
  .alias("p")
  .action((topic: string) => {
    welcome();
    Producer(topic);
  });

program
  .command("profile <profile>")
  .description("Cambia el host de Kafka")
  .action((profile: string) => {
    const envLoadPath = path.resolve(__dirname, `../.env.${profile.trim()}`);

    if (!fs.existsSync(envLoadPath)) {
      return console.log(
        [
          `\nProfile "${profile}" not found\n`,
          "\tUse profile:list to see all profiles",
          "\tUse profile:create to create a new profile",
        ].join("\n")
      );
    }

    const data = fs.readFileSync(envLoadPath);
    const envMainPath = path.resolve(__dirname, "../.env");

    fs.writeFileSync(envMainPath, data, {
      encoding: "utf-8",
      flag: "w",
    });

    loadConfig(envMainPath);

    const { KAFKA_HOST, KAFKA_PROFILE } = data
      .toString()
      .split("\n")
      .reduce((acc, line) => {
        const [key, value] = line.split("=");
        (acc as any)[key] = value;
        return acc;
      }, {} as Record<string, string>);

    console.log(`Se ha cargado el perfil de "${KAFKA_PROFILE}" [${KAFKA_HOST}]`);
  });

program
  .command("profile:create <profile> <host>")
  .description("Crea un nuevo perfil de configuracion")
  .action((profile: string, host: string) => {
    const projectPath = path.resolve(__dirname, `../.env.${profile.trim()}`);

    const data = [`KAFKA_PROFILE=${profile.trim()}`, `KAFKA_HOST=${host.trim()}`].join("\n");

    fs.writeFileSync(projectPath, data, {
      encoding: "utf-8",
      flag: "w",
    });
    console.log(`El perfil ${profile} ha sido creado con el ${host}`);
  });

program
  .command("profile:list")
  .description("Lista los perfiles de configuracion")
  .action(() => {
    const files = fs.readdirSync(path.resolve(__dirname, "../"));
    const profiles = files
      .filter((file) => file.startsWith(".env."))
      .map((file) => file.replace(".env.", ""));

    if (profiles.length === 0) console.log("No se encontraron perfiles");
    else console.log("Perfiles:", profiles.join(", "));
  });

program.parse(process.argv);
