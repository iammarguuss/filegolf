const express = require('express');
const http = require('http');
const fs = require('fs');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Static folder for client side
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/socket.io', express.static(require('path').join(__dirname, 'node_modules', 'socket.io', 'client-dist')));


server.listen(3000, () => {
    console.log('Server listening on port 3000');
});