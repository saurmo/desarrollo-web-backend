
// IMPORTAR FRAMEWORK DE EXPRESS
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

// Inicializar el express
const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload());

app.use("/files",express.static('./temp'));


// ****************** IMPORTAR RUTAS PUBLICAS *************
const router_public_usuario =  require('./routers/usuarios.public.router');
app.use(router_public_usuario)


//*********** MIDDLEWARE JWT */
const auth_middleware = require('./controllers/auth.middleware');
app.use('/', auth_middleware.validarTokenMiddleware)

// ****************** IMPORTAR RUTAS PRIVADAS ******************
const router_usuario =  require('./routers/usuarios.router');
app.use(router_usuario)

const router_destino =  require('./routers/destinos.router');
app.use(router_destino)

const router_archivos =  require('./routers/archivos.router');
app.use(router_archivos)


app.use('/', (req, res)=>{
  let info={ok:false, message:'404 not found', info:null}
  res.status(404).send(info)
})


// Definir el puerto donde se ejecuta el API
const port = 3001

// Inicializar el API
app.listen(port, () => {
  console.log(`API: http://localhost:${port}`)
})