const express = require('express');
const router = express.Router()

const controller = require('../controllers/usuarios.controller');
const { validarToken } = require('../services/jwt.service');

// Crear usuario
router.post('/usuarios', async (req, res) => {
    let usuario = req.body
    try {
        let respuesta_db = await controller.crearUsuario(usuario)
        let info = respuesta_db.rowCount == 1 ? `Usuario creado: ${usuario.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Usuario creado correctamente' : 'No se creo el usuario.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `El usuario (${usuario.id}) ya esta creado.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }
})


// Modificar usuario
router.put('/usuarios', async (req, res) => {
    let usuario = req.body
    try {
        let respuesta_db = await controller.modificarUsuario(usuario)
        let info = respuesta_db.rowCount == 1 ? `Usuario modificado: ${usuario.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Usuario modificado correctamente' : 'No se modifico el usuario.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

// Eliminar usuario con un id enviado por parametro
router.delete('/usuarios/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarUsuario(id)
        let info = respuesta_db.rowCount == 1 ? `Usuario eliminado: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Usuario eliminado correctamente' : 'No se eliminado el usuario.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }

})

// Consultar usuario
router.get('/usuarios/:id?', (req, res) => {
    let id = req.params.id
    controller.consultarUsuarios(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Usuarios consultado', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })
})

// Consultar usuario
router.get('/validar-token', (req, res) => {
    try {
        let token = req.query.token
        if (token == 'null')
            return res.status(401).send({ ok: false, message: 'Token no valido', info: null })


        let usuario_decodificado = validarToken(token)

        return res.send({ ok: true, message: 'Token valido', info: usuario_decodificado })

    } catch (error) {
        return res.status(401).send({ ok: false, message: 'Token no valido', info: null })

    }

})


module.exports = router
