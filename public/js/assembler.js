// This is the class itself
import { firstConnectionTest } from './modules/FirstConnectionTest.js';
import { InterfaceReporter } from './modules/InterfaceReporter.js';
import { RsaGenerator } from './modules/RsaGenerator.js';
import { registerRequest } from './modules/registerRequest.js';
import { ChunkSplitter } from './modules/ChunkSplitter.js';
import { pathFinder } from './modules/pathFinder.js';
import { metaSaver } from './modules/MetaSaver.js';
import { ChunkPreparation } from './modules/ChunkPreparation.js';
import { ChunkEncryptor } from './modules/ChunkEncryptor.js';
//import { pathFinder } from './modules/pathFinder.js';

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
                await this.runParallelTasks(); // lanches 2 lines of methods encryption
            } else {
                InterfaceReporter.TestConnectionFalse();
            }
        } catch (error) {
            console.error("Failed to connect or test server:", error);
        }
    }

    async runParallelTasks() {
        const task1 = this.asyncBlockFile();    // works with files side
        const task2 = this.asyncBlockEncr();    // makes encryption and key exchange
        await Promise.all([task1, task2]);
        console.log('Both async blocks completed');
        this.finalize();
    }

    async asyncBlockEncr() {
        const rsaPair = await RsaGenerator(this.#settings.keySize);     // generates rsa key pair
        const response = await registerRequest(rsaPair);                // registers responce on the server
        const pather = await pathFinder(response);                      // fineds way to get signal id or something else for the exchange
        console.log('Async asyncBlockEncr Completed', response);
    }

    async asyncBlockFile() {
        const meta = await metaSaver(this.#file)                        // saves metadata
            console.log("Metadata Saved: ", meta)
        const chunks = await ChunkSplitter(this.#file, meta);           // devides file into chanks
            console.log("ChunkSplitter has done: ", chunks)
        const ObjectAssabler = await ChunkPreparation(chunks, meta);    // creates ready object
        const encryptedData = await ChunkEncryptor(ObjectAssabler);     // encrypts all the things
        console.log('Async asyncBlockFile Completed', encryptedData);
    }

    finalize() {
//        while(true){
            console.log('We have finished the prearaptions!');
//        }
        // Здесь может быть код, который нужно выполнить после завершения обоих блоков
    }
}
