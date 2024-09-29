const ConnectionTest = require('./ConnectionTest');
const RegisterRequest = require('./RegisterRequest');
const Links = require('./Links');

class ServerSteroids {
    constructor(io) {
        this.io = io;
        this.links = new Links();
        this.setupSocket();
    }

    setupSocket() {
        this.io.on('connection', socket => {
            console.log('New client connected:', socket.id);
            ConnectionTest.PrimaryTest(socket); // Передача socket в ConnectionTest
            RegisterRequest.Simple(socket, this.links); // Передача socket и links в RegisterRequest

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
    }
}

module.exports = ServerSteroids;
