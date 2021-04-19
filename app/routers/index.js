const express = require("express");

const router = express.Router();

const _userController = require("../controllers/users/users.controller");

router
  .get("/usuarios/:id", _userController.getUser)
  .get("/usuarios", _userController.getUsers)
  .post("/usuarios", _userController.createUser)
  .put("/usuarios/:id", _userController.updateUser)
  .delete("/usuarios/:id", _userController.deleteUser);

module.exports = router;
