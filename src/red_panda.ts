import { Queue } from "../queues/queue";

import * as Consumer from './consumer.js';

const redPandaQueue = new Queue<Object>();

export function start() {
  console.log('Connecting to red panda...')
  Consumer.connect(redPandaQueue);
}

start();

process.on('SIGINT', process.exit);

process.on('exit', () => {
  Consumer.disconnect();
});