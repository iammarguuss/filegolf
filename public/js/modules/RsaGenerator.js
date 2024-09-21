// Заглушка для генератора RSA ключей
export function RsaGenerator(keySize) {
    return Promise.resolve({ publicKey: "fake-public-key", privateKey: "fake-private-key" });
}

//module.exports = { RsaGenerator };
