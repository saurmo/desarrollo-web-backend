// Importacion del framework de express
const express = require('express')

// Instanciando un router
const router = express.Router()

// Importar controladores
const usuario_ctr = require("../controllers/usuarios.controller")


// Definicion de los endpoints - rutas

const vs = "/api/v1"

router.get(vs + "/usuarios", usuario_ctr.consultarUsuarios)
    .get(vs + "/usuarios/:id/documentos/:id_documento?", usuario_ctr.consultarUsuario)   // usuarios/1   usuarios/2
    .post(vs + "/usuarios", usuario_ctr.crearUsuario)
    .put(vs + "/usuarios", usuario_ctr.modificarUsuario)
    .delete(vs + "/usuarios", usuario_ctr.eliminarUsuario)



module.exports = router




