// Importacion del framework de express
const express = require('express')

// Instanciando un router
const router = express.Router()

// Importar controladores
const usuario_ctr = require("../controllers/usuarios.controller")
const platos_ctr = require("../controllers/platos.controller")
const auth_ctr = require("../controllers/auth.controller")
const { verificarPeticion } = require('../middlewares/token.middleware')
const { notFound } = require('../middlewares/404.middleware')


// Definicion de los endpoints - rutas

const vs = "/api/v1"

router.post(`${vs}/login`, auth_ctr.login)

router.post(vs + "/usuarios", usuario_ctr.crearUsuario)

router.use(verificarPeticion)

router.get(vs + "/validate", auth_ctr.validarToken)
router.get(vs + "/usuarios", usuario_ctr.consultarUsuarios)
    .put(vs + "/usuarios/:id", usuario_ctr.modificarUsuario)
    .get(vs + "/usuarios/:id", usuario_ctr.consultarUsuario)
    .delete(vs + "/usuarios/:id", usuario_ctr.eliminarUsuario)

router.get(vs + "/platos", platos_ctr.consultarPlatos)
    .post(vs + "/platos", platos_ctr.crearPlato)
    .put(vs + "/platos/:id", platos_ctr.modificarPlato)
    .get(vs + "/platos/:id", platos_ctr.consultarPlato)
    .delete(vs + "/platos/:id", platos_ctr.eliminarPlato)

router.use(notFound)

module.exports = router




