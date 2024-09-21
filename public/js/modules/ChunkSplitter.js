export async function ChunkSplitter(file, meta) {
    const chunkSize = Math.min(Math.max(file.size / 1000, 128 * 1024), 16 * 1024 * 1024);  // Вычисление размера чанка
    const chunks = { 0: { 0: meta } };  // Инициализация нулевого чанка с метаданными
    let position = 0;
    let chunkIndex = 1;  // Начинаем с 1, так как 0 зарезервирован для метаданных

    // Read file in chunks
    while (position < file.size) {
        const chunkData = file.slice(position, position + chunkSize);
        const arrayBuffer = await chunkData.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

        // Generate AES key and IV for each chunk
        const key = await crypto.subtle.generateKey({name: "AES-GCM", length: 256}, true, ["encrypt", "decrypt"]);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const exportedKey = await crypto.subtle.exportKey("raw", key);
        const keyHex = Array.from(new Uint8Array(exportedKey)).map(b => b.toString(16).padStart(2, '0')).join('');
        const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');

        // Create a chunk object
        chunks[chunkIndex] = {
            chunkID: chunkIndex,
            hash: hashHex,
            chunk: arrayBuffer
        };

        // Metadata for each chunk stored in '0.x'
        chunks[0][chunkIndex] = {
            key: keyHex,
            iv: ivHex,
            signature: hashHex, // Using hash as a placeholder for signature
            encryptedSignature: '', // Placeholder, encryption would be done elsewhere
            size: chunkSize
        };

        position += chunkSize;
        chunkIndex++;
    }

    return chunks;
}
