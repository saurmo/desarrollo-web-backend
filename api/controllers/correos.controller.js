
const fs = require('fs');
const { render } = require('../services/handlebars.service');
const { enviarCorreo } = require('../services/nodemailer.service');

const enviarCorreoPorDefecto = async (data) => {
    let { asunto, cuerpo, destinatarios, plantilla } = data
    if (plantilla) {
        cuerpo = fs.readFileSync('./api/templates/correos/' + plantilla).toString('utf-8')
    }
    let { accepted, rejected, messageId } = await enviarCorreo(asunto, cuerpo, destinatarios)
    return { accepted, rejected, messageId }
}

const enviarCorreoBienvenida = async (usuario) => {

    let asunto = 'Bienvenido a la plataforma de reservas'
    let cuerpo = fs.readFileSync('./api/templates/correos/bienvenida.html').toString('utf-8')
    cuerpo = render(cuerpo, usuario)
    let { accepted, rejected, messageId } = await enviarCorreo(asunto, cuerpo, usuario.correo)
    return { accepted, rejected, messageId }
}

module.exports = { enviarCorreoPorDefecto, enviarCorreoBienvenida }