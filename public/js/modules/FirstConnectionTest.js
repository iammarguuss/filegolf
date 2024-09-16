import { settings } from './settings.js';

export function firstConnectionTest() {
    return new Promise((resolve, reject) => {
        const socket = io(settings.io.url);
        let testNumber = Math.floor(Math.random() * 100);

        socket.on('connect', () => {
            console.log('Connected to server via First Connection Test');
            socket.emit('firstConnectionTest', testNumber);
        });

        socket.on('firstConnectionTestResp', data => {
            console.log('Response from server:', data);
            if (data - 1 === testNumber) {
                resolve(true);  // Разрешаем промис с результатом true, если ответ сервера соответствует ожиданиям
            } else {
                reject(new Error("Test failed"));  // Отклоняем промис, если тест не пройден
            }
        });

        socket.on('error', (error) => {
            console.log('Error connecting to server:', error);
            reject(error);  // Отклоняем промис при возникновении ошибки соединения
        });
    });
}
