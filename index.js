const express = require('express');
const app = express();
const http = require('http');
const ip = require('ip');
const moment = require('moment');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

});


const heartBeat = () => {
    const heartbeat = {
        ip: ip.address(),
        status: 'running',
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    // const hb = 
    io.emit('heartbeat', heartbeat);
}

setInterval(heartBeat, 1000);

server.listen(7000, () => {
  console.log('listening on *:7000');
});