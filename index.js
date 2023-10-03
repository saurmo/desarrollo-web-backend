
const express = require('express')

const app = express()


// IMPORTAR ROUTER
const router = require('./src/routers');
app.use(router)

app.listen(3000, () => {
    console.log(`Api corriendo: http://localhost:3000`);
})
