// src/consumer.ts
import { v4 as uuidv4 } from 'uuid';
import {Kafka} from 'kafkajs';
import { IQueue } from '../queues/IQueue';

const kafka = new Kafka({
  clientId: 'orsini',
  brokers: ['0.0.0.0:9092']
});

const consumer = kafka.consumer({ groupId: uuidv4() });

export function connect(queue: IQueue<Object>) {
  return consumer.connect().then(() =>
    consumer.subscribe({topic: 'dev'}).then(() =>
      consumer.run({
        eachMessage: async ({topic, partition, message}) => {
          const formattedValue = JSON.parse((message.value as Buffer).toString()); // everything comes as a buffer
          queue.enqueue(formattedValue);
        },
      })
    )
  );
}

export function disconnect() {
  consumer.disconnect();
}