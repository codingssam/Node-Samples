const express = require('express');
const http = require('http');

var app = express();
var server = http.createServer(app);
server.listen(3000);

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

var io = require('socket.io')(server);
io.on('connection', function (socket) {
   console.log('클라이언트 접속');

   socket.on('message', function (data) {
      console.log('message from client : ', data['message']);
      socket.emit('echo', data);
   });

   socket.on('disconnect', function () {
      console.log('Disconnected');
   });
});

var is = process.stdin;

// System Namespace
var system = io.of('/system');
system.on('connection', function (socket) {
   console.log('emergency namespace connected');

   is.on('data', function (chunk) {
      console.log('emergency namespace!');
      socket.emit('message', { msg: chunk.toString() });
   });
});