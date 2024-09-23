export async function RsaGenerator(keySize) {
    const keyPair = await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: keySize,       // Можно выбрать, например, 2048 или 4096 бит
            publicExponent: new Uint8Array([1, 0, 1]),  // Обычно используется 65537 в качестве публичного экспонента
            hash: {name: "SHA-256"}       // Используем SHA-256 для хеширования
        },
        true,                           // ключ должен быть экспортируемым
        ["encrypt", "decrypt"]          // ключ может использоваться для шифрования и дешифрования
    );

    // Экспортируем ключи для использования вне Web Crypto API
    const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    // Преобразуем экспортированные ключи в формат Base64 для удобства хранения и передачи
    const publicKeyBase64 = arrayBufferToBase64(publicKey);
    const privateKeyBase64 = arrayBufferToBase64(privateKey);

    return {
        publicKey: publicKeyBase64,
        privateKey: privateKeyBase64
    };
}

function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return window.btoa(binary);
}
