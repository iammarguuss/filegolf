// Заглушка для делителя файлов на части
export function ChunkSplitter(file, meta) {
    return Promise.resolve(["chunk1", "chunk2"]);  // Возвращает массив "чанков"
}

//module.exports = { ChunkSplitter };
