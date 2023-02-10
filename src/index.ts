import "dotenv/config";
import { Command } from "commander";
import { welcome } from "./helpers/compara";
import Consumer from "./commands/Consumer";
import Producer from "./commands/Producer";
import fs from "fs";

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
  .command("host")
  .description("Cambia el host de Kafka")
  .alias("h")
  .action((_arg, command) => {
    fs.writeFileSync("/home/david/compara/projects/kafka-client-test/.env", `KAFKA_HOST="${command.args[0]}"`);
  });

program.parse(process.argv);
