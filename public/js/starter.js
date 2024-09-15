// this is a sample that starts the exchange
import { SteroidFile } from './assembler.js';

document.getElementById('fileInput').addEventListener('change', function(event) {
    if (this.files.length > 0) {
        const file = this.files[0];
        const steroidFile = new SteroidFile(file);
    }
});