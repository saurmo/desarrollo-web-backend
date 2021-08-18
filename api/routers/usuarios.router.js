const express = require('express');
const router = express.Router()

const controller = require('../controllers/usuarios.controller')

// Crear usuario
router.post('/usuarios', (req, res)=>{
    let usuario = req.body

    let info = controller.crearUsuario(usuario)
    return res.send(info)
})
// Modificar usuario
router.put('/usuarios', (req, res)=>{
    let info = controller.modificarUsuario()
    return res.send(info)
})

// Eliminar usuario
router.delete('/usuarios/:id', (req, res)=>{
    let id = req.params.id
    let info = controller.eliminarUsuario(id)
    return res.send(info)

})

// Consultar usuario
router.get('/usuarios', (req, res)=>{
    let info = controller.consultarUsuarios()
    return res.send(info)
})


// Consultar usuario login
router.post('/login', (req, res)=>{
    let info = controller.login()
    return res.send(info)
})

module.exports= router
