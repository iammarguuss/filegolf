// This is the class itslef
import { firstConnectionTest } from './modules/FirstConnectionTest.js';

export class SteroidFile {
    #file;

    constructor(file) {
        this.#file = file;
        firstConnectionTest(this.#file);
    }
}
