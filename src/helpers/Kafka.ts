import kafka from "kafka-node";
export default class Kafka {
  protected client: kafka.KafkaClient;

  constructor(protected topic: string) {
    this.client = this.createClient();
    if (!topic) throw new Error("Debe indicar el topico");
  }

  setTopic(topic: string) {
    this.topic = topic;
    return this;
  }

  createClient() {
    return new kafka.KafkaClient({ kafkaHost: "127.0.0.1:9092" });
  }

  topicExist(): Promise<boolean> {
    console.log("comprobando topic");
    return new Promise((resolve) => {
      console.log(this.topic);
      this.client.loadMetadataForTopics([this.topic], (err, [, topics]) => {
        if (err) resolve(false);
        else resolve(Object.keys(topics.metadata).includes(this.topic));
      });
    });
  }

  createTopic(partitions: number = 1, replicationFactor: number = 1): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.createTopics([{ topic: this.topic, partitions, replicationFactor }], function (err, data) {
        if (err) reject(data);
        else resolve();
      });
    });
  }

  async touchTopic(): Promise<void> {
    if (!(await this.topicExist())) {
      await this.createTopic();
      console.log("Se creo el topico:", this.topic);
    }
  }
}
