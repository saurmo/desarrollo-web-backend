const express = require('express');
const router = express.Router()

const controller = require('../controllers/usuarios.controller')




// Consultar usuario login
router.post('/login', async (req, res) => {
    let credenciales = req.body
    try {
        let usuario = await controller.login(credenciales)
        let info = usuario
        let message = usuario ? 'Usuario consultado' : 'No se encontro el usuario.'
        return res.send({ ok: usuario !== undefined, message, info })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })

    }

})

module.exports = router
