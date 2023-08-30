import { setConfig, emit, ConsumerRouter, Callback } from "@comparaonline/event-streamer";

export default class Kafka {
  private consumerStarted = false;
  profile = process.env.KAFKA_PROFILE as string;
  host = process.env.KAFKA_HOST as string;

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
      let input: any = typeof data === "string" ? JSON.parse(data) : data;

      if (input?.topic && input?.data) {
        input = input.data;
      }

      if (!input?.code) {
        input.code = topic;
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
    if (!this.consumerStarted) {
      const consumer = new ConsumerRouter();
      topics
        .map((t) => t.trim())
        .forEach((topic) => {
          console.log(`Suscribiendo a ${topic}`);
          consumer.add(topic, (data) => cb(topic, data));
        });
      this.consumerStarted = true;
      console.log(`Consumiendo en ${this.profile} [${this.host}]`);

      await consumer.start();
      console.log("Consumidor iniciado");
    }
  }
}
