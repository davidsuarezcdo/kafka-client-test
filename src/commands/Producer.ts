import KafkaProducer from "../helpers/KafkaProducer";
import prompts from "prompts";

export default async function (topic: string) {
  const producer = new KafkaProducer(topic);

  send(producer, topic);
}

async function send(producer: KafkaProducer, topic: string) {
  try {
    await prompts({
      name: "messages",
      type: "text",
      message: `Mensajes a enviar a ${topic}`,
      validate: async (value) => {
        if (value.length == 0) return "Debe ingresar al menos un caracter";

        if (!(await producer.send(value))) {
          return "Hubo un error al enviar el mensaje";
        }

        return true;
      },
    });

    send(producer, topic);
  } catch (error) {
    console.error(error);
  }
}
