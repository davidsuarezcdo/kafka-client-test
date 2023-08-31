import Kafka from "../helpers/Kafka";
import { objectToJsonColorized } from "../helpers/jsonColorize";

export default async function (topics: string[]) {
  const kafka = new Kafka();
  const topicsFiltered = [...new Set(topics.map((t) => t.trim()))];

  await kafka.consume(topicsFiltered, (topic, data) => {
    console.log(`From ${topic}:`);
    console.log(objectToJsonColorized(data));
  });
}
