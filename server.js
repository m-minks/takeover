const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(__dirname));

let onlineUsers = [];

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('join', (username) => {
    onlineUsers.push(username);

    io.emit('system message', `${username} entrou no TAKEOVER.`);
    io.emit('online users', onlineUsers);
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor online em http://localhost:3000');
});