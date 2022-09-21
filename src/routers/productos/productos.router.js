// Importar el framework
const express = require('express')

// Importar clase para manipular los archivos
const FileProvider = require('../../controllers/FileProvider')

// Crear una instancia del router
const router = express.Router()

router.post('/productos', (req, res) => {

    try {
        const product = req.body

        const path = "./src/data/productos.json"
        // Leer el json del archivo
        const fileProvider = new FileProvider()
        const buffer = fileProvider.readFile(path)
        const products = JSON.parse(buffer.toString())

        // Agregar el producto
        products.push(product)
        // Guardar el json en el archivo
        fileProvider.saveFile(path, JSON.stringify(products))

        res.send({
            ok: true,
            message: "Producto creado.",
            info: product
        })
    } catch (error) {
        res.status(500).send({
            ok: true,
            message: "Producto NO creado.",
            info: error.toString()
        })
    }

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
