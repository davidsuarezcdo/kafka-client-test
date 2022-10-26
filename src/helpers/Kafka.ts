import { setConfig, emit, ConsumerRouter, Callback } from "@comparaonline/event-streamer";

export default class Kafka {
  private consumerStarted = false;

  constructor(private topic: string) {
    setConfig({
      consumer: {
        groupId: "kafka-test",
      },
      host: process.env.KAFKA_HOSTNAME || "localhost:9092",
    });
  }

  async producer(data: any) {
    await emit(this.topic, data);
    return true;
  }

  async consume(cb: Callback<any>) {
    const consumer = new ConsumerRouter();
    consumer.add(this.topic, cb as any);

    if (!this.consumerStarted) {
      await consumer.start();
      this.consumerStarted = true;
    }
  }
}
