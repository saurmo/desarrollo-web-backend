// Importacion del framework de express
const express = require('express')

// Instanciando un router
const router = express.Router()

// Importar controladores
const usuario_ctr = require("../controllers/usuarios.controller")
const platos_ctr = require("../controllers/platos.controller")


// Definicion de los endpoints - rutas

const vs = "/api/v1"

router.get(vs + "/usuarios", usuario_ctr.consultarUsuarios)
    .post(vs + "/usuarios", usuario_ctr.crearUsuario)
    .put(vs + "/usuarios/:id", usuario_ctr.modificarUsuario)
    .get(vs + "/usuarios/:id", usuario_ctr.consultarUsuario)
    .delete(vs + "/usuarios/:id", usuario_ctr.eliminarUsuario)

router.get(vs + "/platos", platos_ctr.consultarPlatos)
    .post(vs + "/platos", platos_ctr.crearPlato)
    .put(vs + "/platos/:id", platos_ctr.modificarPlato)
    .get(vs + "/platos/:id", platos_ctr.consultarPlato)
    .delete(vs + "/platos/:id", platos_ctr.eliminarPlato)



module.exports = router




