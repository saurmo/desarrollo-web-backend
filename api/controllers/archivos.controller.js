
const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()


/**
 * Guardar archivo en base de datos
 * @param {Object} archivo Archivo a guardar `{nombre, url, id_padre, tipo_padre}`
 * @returns Informacion de la ejecucion en base de datos
 */
const guardarArchivoDb = async (archivo) => {
    const sql = 'INSERT INTO public.archivos (nombre, url, id_padre, tipo_padre) VALUES($1, $2, $3, $4);'
    const datos = [archivo.nombre, archivo.url, archivo.id_padre, archivo.tipo_padre]
    return await _pg.ejecutarQuery(sql, datos)

}


const consultarArchivoDb = async (id_padre, tipo_padre) => {
    const sql = 'SELECT * FROM archivos WHERE id_padre=$1 and tipo_padre=$2'
    const datos = [id_padre, tipo_padre]
    return await _pg.ejecutarQuery(sql, datos)
}

const eliminarArchivoDb = async (id) => {
    const sql = 'DELETE FROM archivos WHERE id=$1'
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = { guardarArchivoDb, consultarArchivoDb, eliminarArchivoDb }

