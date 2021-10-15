
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

module.exports = { guardarArchivoDb }

