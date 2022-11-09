// Importar el framework
const express = require('express')

const { getDocuments, insertDocument, getDocumentById, deleteDocumentById, updateDocumentById, getDocumentsWithFilter } = require('../../controllers/MongoDb');
const { middlewareToken } = require('../../middleware/jwt.middleware');

// Crear una instancia del router
const router = express.Router()

router.post('/productos', middlewareToken, async (req, res) => {
    try {
        const product = req.body
        const responseDb = await insertDocument('tienda', 'productos', product)
        res.send({
            ok: true,
            message: "Producto creado.",
            info: responseDb
        })
    } catch (error) {
        if (Object.keys(error).length > 0) {
            res.status(500).send(error)
        } else {
            res.status(500).send({
                ok: true,
                message: "Producto NO creado.",
                info: error.toString()
            })
        }
    }
})

router.get('/productos', async (req, res) => {
    try {
        const query = req.query

        let productos = []
        if (query && query.search) {
            productos = await getDocumentsWithFilter('tienda', 'productos', { "name": {$regex : `${query.search}`, '$options' : 'i'} })
        } else {
            productos = await getDocuments('tienda', 'productos')
        }

        res.send({
            ok: true,
            message: "Productos consultados",
            info: productos
        })
    } catch (error) {
        console.log(error);
        const message = "Ha ocurrido un error en la lectura del archivo."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

router.get('/productos/:id', async (req, res) => {
    try {
        const id = req.params.id
        const producto = await getDocumentById('tienda', 'productos', id)
        res.send({
            ok: true,
            message: "Producto consultado",
            info: producto
        })
    } catch (error) {
        const message = "Ha ocurrido un error en la lectura del archivo."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }

})

router.put('/productos/:id', middlewareToken, async (req, res) => {
    try {
        const id = req.params.id
        const product = req.body
        const responseDb = await updateDocumentById('tienda', 'productos', { id, data: product })
        if (responseDb.modifiedCount > 0) {
            return res.status(200).send({
                ok: true,
                message: "Producto actualizado.",
                info: product
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "El producto no existe.",
                info: ""
            })
        }
    } catch (error) {
        const message = "Ha ocurrido un error en la lectura del archivo."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

router.delete('/productos/:id', middlewareToken, async (req, res) => {
    try {
        const id = req.params.id
        const responseDb = await deleteDocumentById('tienda', 'productos', id)
        if (responseDb.deletedCount === 1) {
            res.status(200).send({
                ok: true,
                message: "Producto eliminado",
                info: ""
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "El producto no existe.",
                info: responseDb
            })
        }
    } catch (error) {
        const message = "Ha ocurrido un error en la lectura del archivo."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

module.exports = router
