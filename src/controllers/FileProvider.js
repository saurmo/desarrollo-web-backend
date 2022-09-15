// Librería nativa de nodejs para manipular archivos FileSystem
const fs = require('fs');


class FileProvider {

    constructor() {

    }

    /**
     * Método para leer un archivo
     * @param {*} path Ruta del archivo
     * @returns Buffer del archivo
     */
    readFile(path) {
        const buffer = fs.readFileSync(path)
        return buffer
    }

}

module.exports = FileProvider
