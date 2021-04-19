const express = require("express");

const router = express.Router();

const _userController = require("../controllers/users/users.controller");
const _authController = require("../controllers/users/auth.controller");

// RUTAS PUBLICAS
// Rutas no necesitan un token
router.post("/login", _authController.getUserLogin);

//REGISTRO DEL MIDDLEWARE
router.use([_authController.verifyTokenMiddleware]);

// RUTAS PRIVADAS
router
  .get("/verify", _authController.verifyToken)
  .get("/usuarios/:id", _userController.getUser)
  .get("/usuarios", _userController.getUsers)
  .post("/usuarios", _userController.createUser)
  .put("/usuarios/:id", _userController.updateUser)
  .delete("/usuarios/:id", _userController.deleteUser);

module.exports = router;
