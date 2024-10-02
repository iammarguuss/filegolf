export class InterfaceReporter {
    static container = document.getElementById('chunksContainer'); // Получаем контейнер для чанков

    // Метод для добавления чанка
    static addChunk(index, totalChunks) {
        const size = Math.sqrt(80000 / totalChunks); // Размер каждого чанка
        const chunk = document.createElement('div');
        chunk.style.width = `${size-2}px`;
        chunk.style.height = `${size-2}px`;
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

    static displayTextAfterElement(elementId, text) {
        const referenceElement = document.getElementById(elementId);
        if (referenceElement) {
            const textNode = document.createElement('div');
            textNode.textContent = text; // Установка текста
            textNode.style.color = 'white'; // Настройка стиля текста
            textNode.style.marginTop = '10px'; // Добавление отступа сверху
            referenceElement.parentNode.insertBefore(textNode, referenceElement.nextSibling);
        } else {
            console.error('Element with the specified ID was not found.');
        }
    }
}
