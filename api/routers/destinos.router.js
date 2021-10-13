const express = require('express');
const router = express.Router()

const controller = require('../controllers/destinos.controller');
const { validarToken } = require('../services/jwt.service');

// Crear destino
router.post('/destinos', async (req, res) => {
    let destino = req.body
    try {
        let respuesta_db = await controller.crearDestino(destino)
        let info = respuesta_db.rowCount == 1 ? `Destino creado: ${destino.nombre}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Destino creado correctamente' : 'No se creo el destino.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `El destino (${destino.id}) ya esta creado.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }
})


// Modificar destino
router.put('/destinos', async (req, res) => {
    let destino = req.body
    try {
        let respuesta_db = await controller.modificarDestino(destino)
        let info = respuesta_db.rowCount == 1 ? `Destino modificado: ${destino.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Destino modificado correctamente' : 'No se modifico el destino.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

// Eliminar destino con un id enviado por parametro
router.delete('/destinos/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarDestino(id)
        let info = respuesta_db.rowCount == 1 ? `Destino eliminado: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Destino eliminado correctamente' : 'No se eliminado el destino.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }

})

// Consultar destino
router.get('/destinos/:id?', (req, res) => {
    let id = req.params.id
    controller.consultarDestinos(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Destinos consultados', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })
})



module.exports = router
