import Kafka from "../helpers/Kafka";

export default async function (topic: string) {
  const kafka = new Kafka(topic);

  console.log(`listo para escuchar mensajes en "${topic}"\n`);
  kafka.consume((data) => {
    console.log(`from "${topic}":`);
    console.table(data);
  });
}
