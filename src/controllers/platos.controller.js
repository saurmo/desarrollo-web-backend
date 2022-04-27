
// Importar los servicio
const { leerDocumentos, agregarDocumento, modificarDocumento,
     eliminarDocumento } = require('../services/mongodb.service');


// Controlador de platos

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const crearPlato = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "Plato agregado correctamente."
        // Agregar a la base de datos
        let informacion = req.body
        let resultado = await agregarDocumento("platos", informacion)
        console.log(resultado);
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error agregando el plato."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const modificarPlato = async (req, res) => {
    let respuesta = {}
    try {
        let _id = req.params["id"]
        respuesta.ok = true
        respuesta.message = "Plato modificado correctamente."
        // Modificar plato en la base de datos
        let informacion = req.body
        let resultado = await modificarDocumento("platos", { _id }, informacion)
        console.log(resultado);
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error modificando el plato."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const eliminarPlato = async (req, res) => {
    let respuesta = {}
    try {
        let _id = req.params["id"]
        respuesta.ok = true
        respuesta.message = "Plato eliminado correctamente."
        // Eliminar Plato en la base de datos
        let resultado = await eliminarDocumento("platos", { _id })
        console.log(resultado);
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error eliminando el plato."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const consultarPlato = async (req, res) => {
    let respuesta = {}
    try {
        let _id = req.params["id"]
        respuesta.ok = true
        respuesta.message = "Plato consultado correctamente."
        // COnsultar Plato en la base de datos
        let resultado = await leerDocumentos("platos", { _id })
        console.log(resultado);
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error eliminando el plato."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const consultarPlatos = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "Platos consultados correctamente."
        // Consulta a la base de datos de platos
        let resultado = await leerDocumentos("platos")
        console.log(resultado);
        respuesta.info = resultado
        res.send(respuesta)

    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando los platos."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

module.exports = {
    crearPlato,
    modificarPlato,
    eliminarPlato,
    consultarPlato,
    consultarPlatos
}