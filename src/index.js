const express = require('express');
const consumer = require('./consumer');
const config = process.argv[0];
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

consumer.connect(({topic, partition, message}) => {
  console.log("topic " + topic + " partition " + partition + " message " + message);
  io.sockets.emit('newMessage', {topic, partition, message})
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
});