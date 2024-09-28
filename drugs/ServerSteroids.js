const ConnectionTest = require('./ConnectionTest');  // Правильное имя для импорта
const RegisterRequest = require('./RegisterRequest');  // Правильное имя для импорта


class ServerSteroids {
    constructor(io) {
        this.io = io;
        this.setupSocket();
    }

    setupSocket() {
        this.io.on('connection', socket => {
            console.log('New client connected:', socket.id);

            ConnectionTest.PrimaryTest(socket); // Передай socket как аргумент в функцию

            RegisterRequest.Simple(socket); // регистрируем запрос от пользователя

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
    }
}

module.exports = ServerSteroids;
