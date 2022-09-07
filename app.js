
// Importar el framework
const express = require('express')

// Crear una instancia 
const app = express()
const routerProducts = require('./src/routers/productos/productos.router');

// DEFINICION DE ENDPOINSTS
app.use(routerProducts)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Ejecución del API: http://localhost:${PORT}`)
})
