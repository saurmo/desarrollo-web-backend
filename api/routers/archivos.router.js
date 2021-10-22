const express = require('express');
const indexConfig = require('../config/index.config');
const { guardarArchivoDb, consultarArchivoDb, eliminarArchivoDb } = require('../controllers/archivos.controller');
const router = express.Router()
const fs = require('fs');

// Crear archivos
router.post('/archivos', async (req, res) => {
    try {
        let archivos = req.files
        let body = req.body
        let mi_archivo = archivos.mi_archivo
        let nombre = mi_archivo.md5 + '_' + mi_archivo.name
        await mi_archivo.mv('./temp/' + nombre)
        let url = `${indexConfig.HOST_API}/files/${nombre}`
        let response_db = await guardarArchivoDb({ nombre, url, id_padre:body.id_padre, tipo_padre:body.tipo_padre })
        return res.send({ ok: true, message: 'Archivo guardado', info: { url } })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

router.get('/archivos/:tipo_padre/:id_padre', async (req, res) => {
    try {
        let tipo_padre = req.params.tipo_padre
        let id_padre = req.params.id_padre
        let response_db = await consultarArchivoDb(id_padre, tipo_padre)
        return res.send({ ok: true, message: 'Archivos consultados', info: response_db.rows })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

router.delete('/archivos/:id', async (req, res) => {
    try {
        let id = req.params.id
        let nombre = req.query.nombre
        let response_db = await eliminarArchivoDb(id)
        fs.unlinkSync('./temp/' + nombre)
        return res.send({ ok: true, message: 'Archivo eliminado', info: id })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})




module.exports = router
