import kafka from "kafka-node";
import KafkaAbstract from "./Kafka";

export default class KafkaConsumer extends KafkaAbstract {
  private consumer: kafka.Consumer;

  constructor(topic: string) {
    super(topic);
    this.consumer = new kafka.Consumer(this.client, [{ topic }], {
      fromOffset: false,
    });
  }

  onMessage(callback: (data: any) => void) {
    this.consumer.on("message", (data) => callback(data));
  }
}
