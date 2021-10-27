
const { crearToken } = require('../services/jwt.service');
const PostgresService = require('../services/postgres.service');
const { enviarCorreoBienvenida } = require('./correos.controller');
const _pg = new PostgresService()


/**
 * Crear un usuario en base de datos
 * @param {Object} usuario Usuario a guardar `{nombre, id, apellidos, rol, clave}`
 * @returns Informacion de la ejecucion en base de datos
 */
const crearUsuario = async (usuario) => {
    const sql = 'INSERT INTO public.usuarios (nombre, id, apellidos, rol, clave, correo) VALUES($1, $2, $3, $4, md5($5), $6);'
    const datos = [usuario.nombre, usuario.id, usuario.apellidos, usuario.rol, usuario.clave, usuario.correo]
    let respuesta_db = await _pg.ejecutarQuery(sql, datos)
    enviarCorreoBienvenida(usuario).then(response => {
        console.log('Correo de bienvenida enviado');
    }).catch(error => {
        console.error('Error al enviar el correo', error);
    })
    return respuesta_db
}

/**
 * Consultar todos los usuarios de la base de datos
 */
const consultarUsuarios = async (id) => {
    let sql = 'SELECT nombre, apellidos, rol, id, correo  FROM usuarios'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
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

const modificarUsuario = async (usuario) => {
    const sql = `UPDATE public.usuarios SET nombre=$1, apellidos=$2, rol=$3, correo=$5  WHERE id=$4;`
    const datos = [usuario.nombre, usuario.apellidos, usuario.rol, usuario.id, usuario.correo]
    return await _pg.ejecutarQuery(sql, datos)
}

const login = async (credenciales) => {
    let sql = 'SELECT nombre, apellidos, rol, id, correo  FROM usuarios WHERE id=$1 and clave=md5($2)'
    const datos = [credenciales.id, credenciales.clave]
    let respuesta_db = await _pg.ejecutarQuery(sql, datos)
    let usuario = respuesta_db.rowCount == 1 ? respuesta_db.rows[0] : null
    if (usuario) {
        let token = crearToken(usuario)

        return {
            token,
            nombre_completo: usuario.nombre + ' ' + usuario.apellidos,
            rol: usuario.rol

        }

    } else {
        return undefined
    }
}

module.exports = { login, modificarUsuario, eliminarUsuario, crearUsuario, consultarUsuarios }

