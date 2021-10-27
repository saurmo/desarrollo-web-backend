const express = require('express');
const { enviarCorreoPorDefecto } = require('../controllers/correos.controller');

const router = express.Router()



router.post('/correos', async (req, res) => {
    try {
        let { accepted, rejected, messageId } = await enviarCorreoPorDefecto(req.body)
        return res.send({
            ok: true, 
            message: "Correo enviado.",
            info: { accepted, rejected, messageId }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ 
            ok: false, 
            message: 'Ha ocurrido un error no controlado', 
            info: error })
    }
})
module.exports = router