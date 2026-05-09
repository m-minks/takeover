const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static('public'));

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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor online na porta ${PORT}`);
});