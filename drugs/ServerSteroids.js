class ServerSteroids {
    constructor(io) {
        this.io = io;
        this.setupSocket();
    }

    setupSocket() {
        this.io.on('connection', socket => {
            console.log('New client connected:', socket.id);

            socket.on('fileUpload', data => {
                console.log('File uploaded:', data.fileName);
                // Отправка ответа назад клиенту
                socket.emit('serverResponse', { message: `Received your file: ${data.fileName}` });
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
    }
}

module.exports = ServerSteroids;
