
// Importar el framework
const express = require('express')

// Importar lib de cors 
const cors = require('cors');

// Crear una instancia 
const app = express()
const routerProducts = require('./src/routers/productos/productos.router');
const routerBuys = require("./src/routers/compras/compras.router")

// USAR CORS 
app.use(cors())

// DEFINICION DE ENDPOINSTS
app.use(routerProducts)
app.use(routerBuys)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Ejecución del API: http://localhost:${PORT}`)
})
