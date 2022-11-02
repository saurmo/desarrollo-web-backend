
const express = require('express');
const { compareHash } = require('../../controllers/bcrypt');
const { createJsonWebToken } = require('../../controllers/jwt');
const { getDocumentsWithFilter } = require('../../controllers/MongoDb');

const router = express.Router()




router.post("/login", async (req, res) => {

    try {
        const credentials = req.body
        const password = credentials.password
        let user = await getDocumentsWithFilter("tienda", "usuarios", { email: credentials.email })
        if (user.length == 1) {
            user = user[0]
            const passwordIsEqual = compareHash(password, user.password)
            delete user.password
            if (passwordIsEqual === true) {
                // Generando un token con toda la info del usuarios
                const token = createJsonWebToken(user)
                user.token = token
                res.send({
                    ok: true,
                    message: "Usuario consultado.",
                    info: user
                })
            } else {
                res.status(400).send({
                    ok: true,
                    message: "Usuario y/o Contraseña incorrecta.",
                    info: {}
                })
            }
        } else {
            res.status(404).send({
                ok: true,
                message: "Usuario y/o Contraseña incorrecta",
                info: {}
            })
        }

    } catch (error) {
        res.status(500).send({
            ok: true,
            message: "Usuario NO consultado.",
            info: error.toString()
        })
    }





})



module.exports = router