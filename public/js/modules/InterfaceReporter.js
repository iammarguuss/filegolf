export class InterfaceReporter {
    static container = document.getElementById('chunksContainer'); // Получаем контейнер для чанков

    // Метод для добавления чанка
    static addChunk(index, totalChunks) {
        const size = Math.sqrt(1000000 / totalChunks); // Размер каждого чанка
        const chunk = document.createElement('div');
        chunk.style.width = `${size}px`;
        chunk.style.height = `${size}px`;
        chunk.style.background = 'lightgrey'; // Начальный цвет чанков
        chunk.style.border = '1px solid black'; // Граница для визуального разделения чанков
        chunk.style.display = 'inline-block'; // Чтобы чанки располагались рядом друг с другом по возможности
        chunk.id = `chunk-${index}`; // Уникальный ID для чанка
        this.container.appendChild(chunk);
    }

    // Метод для изменения цвета чанка
    static colorChunk(index, color) {
        const chunk = document.getElementById(`chunk-${index}`);
        if (chunk) {
            chunk.style.background = color; // Установить указанный цвет чанка
        }
    }

    static TestConnectionTrue() {
        console.log("Connection test passed successfully.");
        // Здесь можно добавить дополнительный код для обновления интерфейса пользователя
    }

    static TestConnectionFalse() {
        console.error("Connection test failed.");
        // Здесь можно добавить дополнительный код для обновления интерфейса пользователя
    }
}
