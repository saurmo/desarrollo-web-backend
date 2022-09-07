
// Importar el framework
const express = require('express')

// Crear una instancia 
const router = express.Router()

router.post('/productos', (req, res) => {
    res.send('Hello World!')
})

router.get('/productos', (req, res) => {
    res.send('Consultar el listado de productos')
})

router.put('/productos/:id', (req, res) => {
    res.send('Hello World!')
})

router.delete('/productos/:id', (req, res) => {
    res.send('Hello World!')
})

module.exports = router
