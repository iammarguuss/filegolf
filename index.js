const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const ServerSteroids = require('./drugs/ServerSteroids');  // Импорт класса

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')));

new ServerSteroids(io);  // Создание экземпляра класса и передача io

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
