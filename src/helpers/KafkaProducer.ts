import kafka from "kafka-node";
import KafkaAbstract from "./Kafka";
export default class KafkaProducer extends KafkaAbstract {
  private producer: kafka.Producer;
  constructor(topic: string) {
    super(topic);
    this.producer = new kafka.Producer(this.client);
  }

  async send(messages: string): Promise<any> {
    return new Promise((resolve) =>
      this.producer.send([{ topic: this.topic, messages }], (err) => resolve(!err ? true : false))
    );
  }
}
