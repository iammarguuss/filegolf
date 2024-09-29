const crypto = require('crypto');

class Links {
    constructor() {
        this.storage = {};
    }

    generateUniqueCode() {
        let unique = false;
        let code = '';
        while (!unique) {
            // Генерация 6 байтов и конвертация в base64
            code = crypto.randomBytes(6).toString('base64').replace(/=+$/, '');
            // Убедимся, что код уникален
            if (!this.storage.hasOwnProperty(code)) {
                unique = true;
            }
        }
        return code;
    }

    create(publicKey, socketId, settings) {
        // Генерация уникального кода
        const code = this.generateUniqueCode();
        // Сохранение данных
        this.storage[code] = { publicKey, socketId, settings };
        console.log(`Data saved under code ${code}`);
        return code;
    }
}

module.exports = Links;
