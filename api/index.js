
// IMPORTAR FRAMEWORK DE EXPRESS
const express = require('express')
const cors = require('cors')

// Inicializar el express
const app = express()

app.use(express.json())
app.use(cors())


// ****************** IMPORTAR RUTAS PUBLICAS *************
const router_public_usuario =  require('./routers/usuarios.public.router');
app.use(router_public_usuario)


//*********** MIDDLEWARE JWT */
const auth_middleware = require('./controllers/auth.middleware');
app.use('/', auth_middleware.validarTokenMiddleware)

// ****************** IMPORTAR RUTAS PRIVADAS ******************
const router_usuario =  require('./routers/usuarios.router');
app.use(router_usuario)


// Definir el puerto donde se ejecuta el API
const port = 3001

// Inicializar el API
app.listen(port, () => {
  console.log(`API: http://localhost:${port}`)
})