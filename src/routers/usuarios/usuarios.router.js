
// Importar el framework
const express = require('express')

const { getDocuments, insertDocument, getDocumentById, deleteDocumentById, updateDocumentById } = require('../../controllers/MongoDb');
const { middlewareToken } = require('../../middleware/jwt.middleware');
const Users = require('../../models/Users');

// Crear una instancia del router
const router = express.Router()

router.post('/usuarios', async (req, res) => {
    try {
        const userObject = req.body
        userObject.create_by = req.user_logged.name
        const user = new Users(userObject)
        const responseDb = await insertDocument('tienda', 'usuarios', user.initUser())
        res.send({
            ok: true,
            message: "Usuario creado.",
            info: responseDb
        })
    } catch (error) {
        if (Object.keys(error).length > 0) {
            res.status(500).send(error)
        } else {
            res.status(500).send({
                ok: true,
                message: "Usuario NO creado.",
                info: error.toString()
            })
        }
    }
})

router.get('/usuarios', middlewareToken, async (req, res) => {
    try {
        const responseDb = await getDocuments('tienda', 'usuarios')
        const users = Users.removePassword(responseDb)
        res.send({
            ok: true,
            message: "Usuarios consultados",
            info: users
        })
    } catch (error) {
        const message = "Ha ocurrido un error en la consulta de usuarios."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

router.get('/usuarios/:id', middlewareToken, async (req, res) => {
    try {
        const id = req.params.id
        const responseDb = await getDocumentById('tienda', 'usuarios', id)
        delete responseDb.password
        res.send({
            ok: true,
            message: "Usuario consultado",
            info: responseDb
        })
    } catch (error) {
        const message = "Ha ocurrido un error consultando el usuario."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }

})

router.put('/usuarios/:id', middlewareToken, async (req, res) => {
    try {
        const id = req.params.id
        const userObject = req.body
        const user = new Users(userObject)

        const responseDb = await updateDocumentById('tienda', 'usuarios', { id, data: user.initUser() })
        if (responseDb.modifiedCount > 0) {
            return res.status(200).send({
                ok: true,
                message: "Usuario actualizado.",
                info: userObject
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "El usuario no existe.",
                info: ""
            })
        }
    } catch (error) {
        const message = "Ha ocurrido un error modificando el usuario."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

router.delete('/usuarios/:id',middlewareToken, async (req, res) => {
    try {
        const id = req.params.id
        const responseDb = await deleteDocumentById('tienda', 'usuarios', id)
        if (responseDb.deletedCount === 1) {
            res.status(200).send({
                ok: true,
                message: "Usuario eliminado",
                info: ""
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "El usuario no existe.",
                info: responseDb
            })
        }
    } catch (error) {
        const message = "Ha ocurrido un error eliminando el usuario."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

module.exports = router
