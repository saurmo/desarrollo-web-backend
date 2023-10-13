const express = require("express");
const fileupload = require("express-fileupload");

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(fileupload({ tempFileDir: "./tmp" }));

// IMPORTAR ROUTER
const router = require("./src/routers");
app.use(router);

app.listen(3000, () => {
  console.log(`Api corriendo: http://localhost:3000`);
});
