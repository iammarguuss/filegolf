import { InterfaceReporter } from './InterfaceReporter.js';

export async function RegisterRequest(rsaPublicKey, socket, config) {
    // Отправляем запрос на регистрацию с публичным ключом через WebSocket
    const requestData = {
        publicKey: rsaPublicKey,  // Публичный ключ RSA
        socketID: socket.id,    // Идентификатор сокета
        settings: config     // Дополнительные настройки
    };

    // Эмитируем событие 'RegisterRequest' с данными
    socket.emit('RegisterRequest', requestData);
    // Устанавливаем обработчики событий для получения данных от сервера
    socket.on('RegisterResponsed', response => {
        console.log('Response from server:', response);
        InterfaceReporter.displayTextAfterElement('Just_a_random_ID', `Here is your link Sir: ${response.code}`);
    });

    socket.onerror = function(error) {
        console.error('WebSocket Error:', error);
    };

}
