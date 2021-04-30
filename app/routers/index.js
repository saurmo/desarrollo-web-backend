const express = require("express");

const router = express.Router();

const _userController = require("../controllers/users/users.controller");
const _rolesController = require("../controllers/roles/roles.controller");
const _productsController = require("../controllers/products/products.controller");
const _authController = require("../controllers/users/auth.controller");

// RUTAS PUBLICAS
// Rutas no necesitan un token
router.post("/login", _authController.getUserLogin);

//REGISTRO DEL MIDDLEWARE
router.use([_authController.verifyTokenMiddleware]);

// RUTAS PRIVADAS
router
  // Descrifrar y verificar token
  .get("/verify", _authController.verifyToken)
  //CRUD de usuarios
  .get("/users/:id", _userController.getUser)
  .get("/users", _userController.getUsers)
  .post("/users", _userController.createUser)
  .put("/users/:id", _userController.updateUser)
  .delete("/users/:id", _userController.deleteUser)
  //CRUD de roles
  .get("/roles/:id", _rolesController.getRol)
  .get("/roles", _rolesController.getRoles)
  .post("/roles", _rolesController.createRol)
  .put("/roles/:id", _rolesController.updateRol)
  .delete("/roles/:id", _rolesController.deleteRol)
  //CRUD de productos
  .get("/products/:id", _productsController.getProduct)
  .get("/products", _productsController.getProducts)
  .post("/products", _productsController.createProduct)
  .put("/products/:id", _productsController.updateProduct)
  .delete("/products/:id", _productsController.deleteProduct)
  // AGREGAR ARCHIVOS A UN PRODUCTO
  .post("/products/:id/archivos", _productsController.saveFiles);

module.exports = router;
