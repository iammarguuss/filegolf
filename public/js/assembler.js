// This is the class itself
import { firstConnectionTest } from './modules/FirstConnectionTest.js';
import { InterfaceReporter } from './modules/InterfaceReporter.js';
import { RsaGenerator } from './modules/RsaGenerator.js';
import { RequestSender } from './modules/RequestSender.js';
import { ChunkSplitter } from './modules/ChunkSplitter.js';
import { Encryptor } from './modules/Encryptor.js';

export class SteroidFile {
    #file;
    #settings;

    constructor(settings, file) {
        this.#file = file;
        this.#settings = settings;
        this.initialize();
    }

    async initialize() {
        try {
            const isServerOn = await firstConnectionTest();
            if (isServerOn) {
                InterfaceReporter.TestConnectionTrue();
                await this.runParallelTasks();
            } else {
                InterfaceReporter.TestConnectionFalse();
            }
        } catch (error) {
            console.error("Failed to connect or test server:", error);
        }
    }

    async runParallelTasks() {
        const task1 = this.asyncBlockOne();
        const task2 = this.asyncBlockTwo();
        await Promise.all([task1, task2]);
        console.log('Both async blocks completed');
        this.finalize();
    }

    async asyncBlockOne() {
        const rsaPair = await RsaGenerator.generate(this.#settings.keySize);
        const response = await RequestSender.sendRequest(rsaPair);  // Предполагаем, что sendRequest использует rsaPair
        console.log('Async Block One Completed', response);
    }

    async asyncBlockTwo() {
        const chunks = await ChunkSplitter.split(this.#file);
        const encryptedData = await Encryptor.encrypt(chunks);
        console.log('Async Block Two Completed', encryptedData);
    }

    finalize() {
        console.log('Finalizing operations.');
        // Здесь может быть код, который нужно выполнить после завершения обоих блоков
    }
}
