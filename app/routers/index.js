const express = require("express");

const router = express.Router();

router.get("/usuarios", (req, res) => {
  res.send("Get usuarios");
});

module.exports = router;
