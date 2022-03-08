
//src/index.ts
import readline from 'readline';

import * as Producer from './producer.js';
import * as Consumer from './consumer.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function start() {
  console.log('connecting...')
  Consumer.connect().then(() => {
    rl.question('enter user name \n', function (username) { // the username to print it along with the messages
      Producer.getConnection(username).then((sendMessage) => {
        console.log('connected, press Ctrl+C to exit')
        rl.on('line', (input) => {
          readline.moveCursor(process.stdout, 0,-1); // removing the input so you don't get duplicated items in terminal
          sendMessage(input);
        })
      })
    });
  })
}

start();
// handling shut down

process.on('SIGINT', process.exit);

process.on('exit', () => {
  Consumer.disconnect();
  rl.close();
});