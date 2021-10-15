const express = require('express');
const indexConfig = require('../config/index.config');
const { guardarArchivoDb } = require('../controllers/archivos.controller');
const router = express.Router()




// Crear archivos
router.post('/archivos', async (req, res) => {
    try {


        let archivos = req.files
        let mi_archivo = archivos.mi_archivo
        let nombre = mi_archivo.md5 + '_' + mi_archivo.name
        await mi_archivo.mv('./temp/' + nombre)

        let url = `${indexConfig.HOST_API}/files/${nombre}`

        let response_db = await guardarArchivoDb({ nombre, url, id_padre:'', tipo_padre:'' })

        return res.send({ ok: true, message: 'Archivo guardado', info: { url } })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
  
    }
})




module.exports = router
