import KafkaConsumer from "../helpers/KafkaConsumer";

export default async function (topic: string) {
  const consumer = new KafkaConsumer(topic);
  await consumer.touchTopic();

  console.log(`listo para escuchar mensajes en ${topic}`);
  consumer.onMessage((data) => console.log("[consumer-message]", data));
}
