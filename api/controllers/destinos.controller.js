
const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()


/**
 * Crear un destino en base de datos
 * @param {Object} destino Destino a guardar `{nombre, descripcion, precio}`
 * @returns Informacion de la ejecucion en base de datos
 */
const crearDestino = async (destino) => {
    const sql = 'INSERT INTO public.destinos (nombre,  descripcion, precio) VALUES($1, $2, $3);'
    const datos = [destino.nombre, destino.descripcion, destino.precio]
    return await _pg.ejecutarQuery(sql, datos)
}

/**
 * Consultar todos los destinos de la base de datos
 */
const consultarDestinos = async (id) => {
    let sql = 'SELECT * FROM destinos'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

/**
 * Eliminar destino de la base de datos
 * @param {String} id Id del destino
 * @returns Informacion de la ejecucion en base de datos
 */
const eliminarDestino = async (id) => {
    const sql = 'DELETE FROM public.destinos WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarDestino = async (destino) => {
    const sql = `UPDATE public.destinos SET nombre=$1, descripcion=$2, precio=$3  WHERE id=$4;`
    const datos = [destino.nombre, destino.descripcion, destino.precio, destino.id]
    return await _pg.ejecutarQuery(sql, datos)
}



module.exports = {  modificarDestino, eliminarDestino, crearDestino, consultarDestinos }

