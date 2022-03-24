// Importacion del framework de express
const express = require('express')

// Instanciar la aplicacion de express
const app = express()

// Integrando el router con la app
const router = require("./routers/index.router")
app.use(router)


// Puerto donde se levanta el servidor web 
// Puerto donde esta escuchando la API
const PORT = 3000

// Levantar la API que estará escuchando en el PUERTO 3000
// 1. Primer parametro: Puerto
// 2. Segundo parametro: Callback - Funcion
app.listen(PORT, () => {
  console.log(`API escuchando en: http://localhost:${PORT}`)
})
