import "dotenv/config";
import * as dotenv from "dotenv";
import { Command } from "commander";
import { welcome } from "./helpers/compara";
import Consumer from "./commands/Consumer";
import Producer from "./commands/Producer";
import fs from "fs";
import path from "path";

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
    const projectPath = path.resolve(__dirname, `../.env.${profile.trim()}`);
    const data = fs.readFileSync(projectPath);
    fs.writeFileSync(path.resolve(__dirname, "../.env"), data);
    dotenv.config({ path: projectPath });
    console.log(`Profile ${profile} loaded`);
  });

program
  .command("profile:create <profile> <host>")
  .description("Crea un nuevo perfil de configuracion")
  .action((profile: string, host: string) => {
    const projectPath = path.resolve(__dirname, `../.env.${profile.trim()}`);
    fs.writeFileSync(projectPath, `KAFKA_HOST=${host.trim()}`);
    console.log(`Profile ${profile} created with host ${host}`);
  });

program.parse(process.argv);
