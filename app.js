
// Importar el framework
const express = require('express')

// Importar lib de cors 
const cors = require('cors');

// Crear una instancia 
const app = express()
const routerProducts = require('./src/routers/productos/productos.router');
const routerUsers = require('./src/routers/usuarios/usuarios.router');
const routerBuys = require("./src/routers/compras/compras.router")
const routerAuth = require("./src/routers/auth/auth.router")

// USAR CORS 
app.use(cors())

// USAR JSON EN EL BODY
app.use(express.json())

// DEFINICION Y USO DE ENDPOINSTS
app.use(routerProducts)
app.use(routerBuys)
app.use(routerUsers)
app.use(routerAuth)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Ejecución del API: http://localhost:${PORT}`)
})
