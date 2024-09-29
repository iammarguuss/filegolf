class RegisterRequest {
    static Simple(socket, links) { // Теперь links передается как параметр
        socket.on('RegisterRequest', data => {
            console.log('Received RegisterRequest:', data);

            // Вызываем метод create из класса Links
            const code = links.create(data.publicKey, socket.id, data.settings);

            // Отправляем обратно код доступа и статус OK
            socket.emit('RegisterResponsed', { code: code, status: 'OK' });
        });
    }
}

module.exports = RegisterRequest;
