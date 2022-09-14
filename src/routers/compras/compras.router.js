const express = require('express');

const router = express.Router()

const crearCompra = (req, res) => {
    res.send("Creación de compra")
}

const consultarCompras = (req, res) => {
    res.send("Consulta de compras")
}

router.post("/compras", crearCompra)

router.get("/compras", consultarCompras)


router.put("/compras/:id", (req, res) => {
    res.send("Modificar compra")
})

router.delete("/compras/:id")

module.exports = router