import prompts from "prompts";
import Kafka from "../helpers/Kafka";

export default async function (topic: string) {
  send(topic);
}

async function send(topic: string) {
  try {
    await prompts({
      name: "messages",
      type: "text",
      message: `Mensajes a enviar a "${topic}"`,
      validate: async (value) => {
        if (value.length === 0) return "Debe ingresar al menos un caracter";

        const kafka = new Kafka(topic);
        await kafka.producer(value);

        return true;
      },
    });

    send(topic);
  } catch (error) {
    console.error(error);
  }
}
