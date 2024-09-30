import { InterfaceReporter } from './InterfaceReporter.js';

export async function ChunkEncryptor(chunks) {
    for (let i = 1; i < Object.keys(chunks).length; i++) {
        if (chunks[0][i]) { // Убедимся, что метаданные для этого чанка существуют
            const keyData = chunks[0][i].key;
            const ivData = chunks[0][i].iv;
            const key = await importKey(keyData);
            const iv = new Uint8Array(ivData.match(/[\da-f]{2}/gi).map(hex => parseInt(hex, 16)));

            // Шифруем чанк
            const encryptedData = await crypto.subtle.encrypt(
                { name: "AES-GCM", iv: iv },
                key,
                chunks[i].chunk
            );

            // Обновляем чанк данными
            chunks[i].chunk = encryptedData;

            // Создаем хеш зашифрованного чанка
            const hashBuffer = await crypto.subtle.digest('SHA-256', encryptedData);
            const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
            chunks[0][i].encryptedSignature = hashHex;
            InterfaceReporter.colorChunk(i, 'red');
        }
    }
    return chunks;
}

async function importKey(keyHex) {
    const keyBytes = new Uint8Array(keyHex.match(/[\da-f]{2}/gi).map(hex => parseInt(hex, 16)));
    return await crypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}
