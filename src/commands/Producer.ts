import Kafka from "../helpers/Kafka";
import { welcome } from "../helpers/compara";
import { wait } from "../helpers/wait";
import { objectToJsonColorized } from "../helpers/jsonColorize";
import { readInputObject } from "../helpers/readInputObject";

export default async function (topic: string) {
  const kafka = new Kafka();
  waitNewMessage(kafka, topic);
}

async function waitNewMessage(kafka: Kafka, topic: string, oldMessage?: any): Promise<void> {
  try {
    welcome(`Produciendo en "${topic}" de "${kafka.profile}" [${kafka.host}]`);

    if (oldMessage) {
      console.log("\nMensaje anterior:\n");
      console.log(objectToJsonColorized(oldMessage));
    }

    console.log("\n----\n");

    console.log("Ingrese el mensaje a enviar (JS/JSON):");
    const message = await readInputObject();

    if (!message) {
      console.log("Mensaje invalido");
      await wait(2500);
      return waitNewMessage(kafka, topic, oldMessage);
    }

    console.log("Enviando mensaje", message);
    await kafka.producer(topic, message);
    waitNewMessage(kafka, topic, message);
  } catch (error) {
    console.error(error);
  }
}
