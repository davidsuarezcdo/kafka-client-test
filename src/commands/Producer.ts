import prompts from "prompts";
import Kafka from "../helpers/Kafka";

export default async function (topic: string) {
  const kafka = new Kafka();
  console.log(`Produciendo a "${kafka.host}"`);
  send(kafka, topic);
}

async function send(kafka: Kafka, topic: string) {
  try {
    await prompts({
      name: "messages",
      type: "text",
      message: `Mensajes a enviar a "${topic}"`,
      validate: async (value) => {
        if (value.length === 0) return "Debe ingresar al menos un caracter";

        await kafka.producer(topic, value);

        return true;
      },
    });

    send(kafka, topic);
  } catch (error) {
    console.error(error);
  }
}
