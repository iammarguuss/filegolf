/**
 * Сохраняет и возвращает метаданные файла.
 * @param {File} file - файл, для которого необходимо извлечь метаданные.
 * @returns {Object} Объект метаданных файла.
 */
export function metaSaver(file) {
    if (!file || !(file instanceof File)) {
        throw new Error('The provided value is not a File.');
    }

    // Создаем объект метаданных
    const metadata = {
        name: file.name,              // Оригинальное имя файла
        size: file.size,              // Размер файла в байтах
        type: file.type,              // MIME-тип файла
        lastModified: file.lastModified ? new Date(file.lastModified) : new Date()
    };

    return metadata;  // Возвращаем метаданные
}
