
// Importar el framework
const express = require('express')

const { getDocuments, insertDocument, getDocumentById, deleteDocumentById, updateDocumentById } = require('../../controllers/MongoDb');

// Crear una instancia del router
const router = express.Router()

router.post('/usuarios', async (req, res) => {
    try {
        const userObject = req.body
        const responseDb = await insertDocument('tienda', 'usuarios', userObject)
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

router.get('/usuarios', async (req, res) => {
    try {
        const responseDb = await getDocuments('tienda', 'usuarios')
        res.send({
            ok: true,
            message: "Usuarios consultados",
            info: responseDb
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

router.get('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id
        const responseDb = await getDocumentById('tienda', 'usuarios', id)
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

router.put('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id
        const userObject = req.body
        const responseDb = await updateDocumentById('tienda', 'usuarios', { id, data: userObject })
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

router.delete('/usuarios/:id', async (req, res) => {
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
