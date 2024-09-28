class RegisterRequest {
    static Simple(socket) {
        socket.on('RegisterRequest', data => {
            console.log('Received RegisterRequest:', data);

            // TODO REGISTER REQUEST

            // Просто отправляем обратно ответ OK
            socket.emit('RegisterResponsed', { status: 'OK' });

        });
    }
}

module.exports = RegisterRequest;
