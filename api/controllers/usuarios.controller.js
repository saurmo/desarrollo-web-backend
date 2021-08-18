
let usuarios=[]

const crearUsuario = (usuario) => {
    usuarios.push(usuario)
    return usuario
}

const consultarUsuarios = () => {
return usuarios
}


const eliminarUsuario = (id) => {
let posicion = usuarios.findIndex(x=>x.id == id)
return usuarios.splice(posicion, 1)
}

const modificarUsuario = (usuario) => {

}

const login = (credenciales) => {
return "LOGIN"
}

module.exports = { login, modificarUsuario, eliminarUsuario, crearUsuario, consultarUsuarios }

