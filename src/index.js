const express = require('express');
const consume = require('consumer.ts');
const config = process.argv[0];
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

consumer.connect(({topic, partition, message}) => {
  io.sockets.emit('newMessage', {topic, partition, message})
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(port, () => {
    console.log(`App listening on port ${config.socketPort}`);
});