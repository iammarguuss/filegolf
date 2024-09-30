export class InterfaceReporter {
    static TestConnectionTrue() {
        console.log("Connection test passed successfully.");
        // Здесь можно добавить дополнительный код для обновления интерфейса пользователя
    }

    static TestConnectionFalse() {
        console.error("Connection test failed.");
        // Здесь можно добавить дополнительный код для обновления интерфейса пользователя
    }

    static container = document.getElementById('chunksContainer'); // Получаем контейнер для чанков

    // Метод для инициализации/обновления чанков
    static updateChunks(chunksCount) {
        this.clearChunks(); // Очистить текущие чанки
        const size = Math.sqrt(1000000 / chunksCount); // Размер каждого чанка

        for (let i = 0; i < chunksCount; i++) {
            const chunk = document.createElement('div');
            chunk.style.width = `${size}px`;
            chunk.style.height = `${size}px`;
            chunk.style.background = 'lightgrey'; // Начальный цвет чанков
            chunk.style.border = '1px solid black'; // Граница для визуального разделения чанков
            this.container.appendChild(chunk);
        }
    }

    // Метод для изменения цвета чанка по индексу
    static colorChunk(index, color) {
        const chunk = this.container.children[index];
        if (chunk) {
            chunk.style.background = color; // Установить указанный цвет чанка
        }
    }

    // Метод для очистки чанков
    static clearChunks() {
        this.container.innerHTML = ''; // Удалить все дочерние элементы контейнера
    }
}
