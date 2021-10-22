const express = require('express');
const { enviarCorreo } = require('../services/nodemailer.service');
const router = express.Router()

const fs = require('fs');


router.post('/correos', async (req, res) => {
    try {
        let { asunto, cuerpo, destinatarios, plantilla } = req.body
        if (plantilla) {
            cuerpo = fs.readFileSync('./api/templates/correos/'+plantilla).toString('utf-8')
        }
        let { accepted, rejected, messageId } = await enviarCorreo(asunto, cuerpo, destinatarios)       
         return res.send({
            ok: true, message: "Correo enviado.", info: { accepted, rejected, messageId }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})
module.exports = router