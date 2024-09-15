import { settings } from './settings.js';

export function firstConnectionTest(file) {
    const socket = io(settings.io.url);

    socket.on('connect', () => {
        console.log('Connected to server via First Connection Test');
        // Отправка файла на сервер
        socket.emit('fileUpload', { fileName: file.name });
    });

    socket.on('serverResponse', data => {
        console.log('Response from server:', data.message);
    });
}