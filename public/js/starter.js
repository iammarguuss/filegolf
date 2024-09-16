// this is a sample that starts the exchange
import { SteroidFile } from './assembler.js';

let globalSteroidFile; // Глобальная переменная для доступа к экземпляру класса

document.getElementById('sendData').addEventListener('click', function() {
    const shareType = document.querySelector('input[name="shareType"]:checked').value;
    const keySize = document.getElementById('keySize').value;
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const settings = {
        shareType: shareType,
        keySize: keySize || 4096 // Установка значения по умолчанию
    };

    globalSteroidFile = new SteroidFile(settings, file); // Создание экземпляра с настройками и файлом
    console.log("Settings and file are set:", settings, file.name);
});
