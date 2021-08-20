
const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

/**
 * Crear un usuario en base de datos
 * @param {Object} usuario Usuario a guardar `{nombre, id, apellidos, rol, clave}`
 * @returns Informacion de la ejecucion en base de datos
 */
const crearUsuario = async (usuario) => {
    const sql = 'INSERT INTO public.usuarios (nombre, id, apellidos, rol, clave) VALUES($1, $2, $3, $4, $5);'
    const datos = [usuario.nombre, usuario.id, usuario.apellidos, usuario.rol, usuario.clave]
    return await _pg.ejecutarQuery(sql, datos)
}

/**
 * Consultar todos los usuarios de la base de datos
 */
const consultarUsuarios = async () => {
    const sql = 'SELECT nombre, apellidos, rol, id  FROM usuarios'
    return await _pg.ejecutarQuery(sql)
}

/**
 * Eliminar usuario de la base de datos
 * @param {String} id Id del usuario
 * @returns Informacion de la ejecucion en base de datos
 */
const eliminarUsuario = async (id) => {
    const sql = 'DELETE FROM public.usuarios WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarUsuario = (usuario) => {
    let id = usuario.id
    let posicion = usuarios.findIndex(x => x.id == id)
    return usuarios.splice(posicion, 1, usuario)

}

const login = (credenciales) => {
    return "LOGIN"
}

module.exports = { login, modificarUsuario, eliminarUsuario, crearUsuario, consultarUsuarios }

