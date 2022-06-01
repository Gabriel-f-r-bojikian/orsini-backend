const express = require('express');
const consume = require('consumer.ts');
const config = process.argv[0];
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req: any, res: any) => {
    res.sendFile(__dirname + '/index.html');
});

consume(({topic, partition, message}: any) => {
  // io.sockets.emit('newMessage', {topic, partition, message})
  console.log(message);
})

io.on('connection', (socket: any) => {
    socket.on('chat message', (msg: any) => {
      io.emit('chat message', msg);
    });
  });

server.listen("3000", () => {
    console.log(`App listening on port 3000`);
});