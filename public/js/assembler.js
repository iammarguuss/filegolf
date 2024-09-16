// This is the class itself
import { firstConnectionTest } from './modules/FirstConnectionTest.js';
import { InterfaceReporter } from './modules/InterfaceReporter.js';


export class SteroidFile {
    #file;
    #settings;

    constructor(settings, file) {
        this.#file = file;
        this.#settings = settings;
        firstConnectionTest().then((isServerOn) => {
            if (isServerOn) {
                InterfaceReporter.TestConnectionTrue();
                this.startNextMethod();
            }
        }).catch(error => {
            InterfaceReporter.TestConnectionFalse();
            console.error("Failed to connect or test server:", error);
        });
    }

    startNextMethod() {
        console.log('Server is on, starting next method.');
    }
}
