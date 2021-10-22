const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASSWORD } = require('../config/index.config');

const enviarCorreo = async (asunto, cuerpo, destinatarios) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: EMAIL_USER, // generated ethereal user
            pass: EMAIL_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Desarrollo Web" <${EMAIL_USER}>`, // sender address
        bcc: destinatarios,
        subject: asunto, // Subject line
        html: cuerpo, // html body
    });

return info

}

module.exports = { enviarCorreo }