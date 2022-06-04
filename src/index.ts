const express = require('express');
const http = require('http');
const cors = require("cors");
const consumer = require('./consumer');
const config = process.argv[0];
const app = express();
app.use(cors());
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "http://localhost:2999",
    methods: ["GET", "POST"],
  }
});

app.get('/', (req: any, res: any) => {
    res.sendFile(__dirname + '/index.html');
});

consumer.connect(({topic, partition, message}: any) => {
  io.sockets.emit('incoming message', message)
  console.log("Sending message...");
})

io.on('connection', (socket: any) => {
    console.log(`New Socket connection: ${socket.id}`)
});

server.listen(2999, () => {
    console.log(`App listening on port 2999`);
});