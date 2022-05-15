import { v4 as uuidv4 } from 'uuid';
import {Kafka} from 'kafkajs';
import { IQueue } from '../queues/IQueue';
import { IMessage } from './types/IMessage';

const config = require(process.argv[0]);

const kafka = new Kafka({
  clientId: 'orsini',
  brokers: [config.redPanda.host + config.redPanda.port]
});

const consumer = kafka.consumer({ groupId: uuidv4() });

export function connect(callback: Function) {
  return consumer.connect().then(() =>
    consumer.subscribe({topic: 'dev'}).then(() =>
      consumer.run({
        eachMessage: async ({topic, partition, message}) => {
          callback({topic, partition, message});
        },
      })
    )
  );
}

export function disconnect() {
  consumer.disconnect();
}

function handleMessage(queue: IQueue<Object>, message) {
  const formattedValue = JSON.parse((message.value as Buffer).toString()); // everything comes as a buffer
  queue.enqueue(formattedValue);
  console.log(`${formattedValue.user}: ${formattedValue.message}`)
}