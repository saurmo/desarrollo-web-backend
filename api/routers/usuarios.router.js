const express = require('express');
const router = express.Router()

const controller = require('../controllers/usuarios.controller')

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
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
        }
    }
})


// Modificar usuario
router.put('/usuarios', (req, res) => {
    let usuario = req.body
    let info = controller.modificarUsuario(usuario)
    return res.send(info)
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
router.get('/usuarios', (req, res) => {
    controller.consultarUsuarios().then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Usuarios consultado', info })
    }).catch(error => {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })

})


// Consultar usuario login
router.post('/login', (req, res) => {
    let info = controller.login()
    return res.send(info)
})

module.exports = router
