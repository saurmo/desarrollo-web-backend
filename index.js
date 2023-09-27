
const express = require('express')

const app = express()

app.get('/tasks', function (req, res) {
    res.send([
        { id:1, name: "Prueba ejemplo" }
    ])
})

app.listen(3000, () => {
    console.log(`Api corriendo: http://localhost:3000`);
})
