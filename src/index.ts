import "dotenv/config";
import { Command } from "commander";
import { welcome } from "./helpers/compara";
import Consumer from "./commands/Consumer";
import Producer from "./commands/Producer";

welcome();

const program = new Command();

program.version("0.1.0").description("Kafka CLI");

program
  .command("consumer <topic>")
  .description("Consume mensajes de un topico")
  .alias("c")
  .action((topic: string) => Consumer(topic));

program
  .command("producer <topic>")
  .description("Produce mensajes a un topico")
  .alias("p")
  .action((topic: string) => Producer(topic));

program.parse(process.argv);
