// Importar el framework
const express = require('express')

// Importar clase para manipular los archivos
const FileProvider = require('../../controllers/FileProvider')

// Crear una instancia del router
const router = express.Router()

router.post('/productos', (req, res) => {
    res.send('Hello World!')
})

router.get('/productos', (req, res) => {
    try {
        const path = "./src/data/productos.json"
        const fileProvider = new FileProvider()
        const buffer = fileProvider.readFile(path)
        // Usar clase JSON de javascript para convertir 
        // el contenido del archivo en json
        const productos = JSON.parse(buffer.toString())
        res.send({
            ok: true,
            message: "Productos consultados",
            info: productos
        })
    } catch (error) {
        const message = "Ha ocurrido un error en la lectura del archivo."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }

})

router.put('/productos/:id', (req, res) => {
    res.send('Hello World!')
})

router.delete('/productos/:id', (req, res) => {
    res.send('Hello World!')
})

module.exports = router
