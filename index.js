const express = require('express');
const app = express();
const http = require('http');
const ip = require('ip');
const moment = require('moment');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

if(!process.env.HEARTBEAT) {
    console.error('Error: node command without assign HEARTBEAT=string');
    return;
}

const heartbeat = process.env.HEARTBEAT;
console.log('process.env.HEARTBEAT: ' + heartbeat);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a client connected');

    socket.on('disconnect', () => {
      console.log('a client disconnected');
    });
});


const heartBeat = () => {
    const data = {
        ip: ip.address(),
        status: 'running',
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    // const hb = 
    io.emit(heartbeat, data);
}

setInterval(heartBeat, 1000);

server.listen(7000, () => {
  console.log('listening on *:7000');
});