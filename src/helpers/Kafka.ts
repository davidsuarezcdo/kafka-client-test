import { setConfig, emit, ConsumerRouter, Callback } from "@comparaonline/event-streamer";

export default class Kafka {
  private consumerStarted = false;
  private host = process.env.KAFKA_HOST || "localhost:9092";

  constructor() {
    const hash = Date.now();

    setConfig({
      consumer: {
        groupId: `kafka-test-${hash}`,
      },
      host: this.host,
    });
  }

  async producer(topic: string, data: any) {
    try {
      let input = JSON.parse(data) as any;

      if (input?.topic && input?.data) {
        input = input.data;
      }

      const { code, ...payload } = input;
      await emit(topic, code, payload);
    } catch (error) {
      console.log(JSON.parse(data));
      console.error(error);
    }
    return true;
  }

  async consume(topics: string[], cb: Callback<any>) {
    console.log(`Starting at`, this.host);

    if (!this.consumerStarted) {
      const consumer = new ConsumerRouter();
      topics
        .map((t) => t.trim())
        .forEach((topic) => {
          console.log(`Subscribing to ${topic}`);
          consumer.add(topic, (data) => cb(topic, data));
        });
      this.consumerStarted = true;
      await consumer.start();
    }
  }
}
