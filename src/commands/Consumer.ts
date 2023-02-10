import Kafka from "../helpers/Kafka";

export default async function (topics: string[]) {
  const kafka = new Kafka();

  await kafka.consume(topics, (topic, data) => {
    console.log(`From ${topic}:`, data);
  });
}
