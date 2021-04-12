const express = require("express");

const router = express.Router();

const _userController = require("../controllers/users/users.controller");

router
  .get("/usuarios", _userController.getUsers)
  .post("/usuarios", _userController.createUser)
  .put("/usuarios", _userController.updateUser)
  .delete("/usuarios", _userController.deleteUser);

module.exports = router;
