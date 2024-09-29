import { settings } from './modules/settings.js'; // Импорт настроек
import { firstConnectionTest } from './modules/FirstConnectionTest.js';
import { InterfaceReporter } from './modules/InterfaceReporter.js';
import { RsaGenerator } from './modules/RsaGenerator.js';
import { RegisterRequest } from './modules/RegisterRequest.js';
import { PathFinder } from './modules/PathFinder.js';
import { metaSaver } from './modules/MetaSaver.js';
import { ChunkSplitter } from './modules/ChunkSplitter.js';
import { ChunkEncryptor } from './modules/ChunkEncryptor.js';

export class SteroidFile {
    #file;
    #socket;
    #settings = {
        change:{},
        keys:{}
    };

    constructor(config, file) {
        this.#file = file;
        this.#settings.change = config;
        this.#socket = io(settings.io.url);
        this.initialize();
    }

    async initialize() {
        try {
            const isServerOn = await firstConnectionTest();
            if (isServerOn) {
                InterfaceReporter.TestConnectionTrue();
                await this.runParallelTasks(); // Launches 2 lines of methods encryption
            } else {
                InterfaceReporter.TestConnectionFalse();
            }
        } catch (error) {
            console.error("Failed to connect or test server:", error);
        }
    }

    async runParallelTasks() {
        const task1 = this.asyncBlockFile();
        const task2 = this.asyncBlockEncr();
        await Promise.all([task1, task2]);
        console.log('Both async blocks completed');
        this.finalize();
    }

    async asyncBlockEncr() {
        const rsaPair = await RsaGenerator(this.#settings.change.keySize);             
        this.#settings.keys = await rsaPair;
        console.log("Key Pair is generated", rsaPair);
        let pack = {
            type: this.#settings.change.shareType,
            keySize: this.#settings.change.keySize
        }
        const response = await RegisterRequest(rsaPair.publicKey, this.#socket, pack);
        const pather = await PathFinder(response);
        console.log('Async asyncBlockEncr Completed', response);
    }

    async asyncBlockFile() {
        const meta = await metaSaver(this.#file);
        console.log("Metadata Saved: ", meta);
        const chunks = await ChunkSplitter(this.#file, meta);
        console.log("ChunkSplitter has done: ", chunks);
        const encryptedData = await ChunkEncryptor(chunks);
        console.log('Async asyncBlockFile Completed', encryptedData);
    }

    finalize() {
        console.log('We have finished the preparations!');
    }
}
