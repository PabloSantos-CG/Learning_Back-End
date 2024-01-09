const express = require("express");

const router = express.Router();

router.get("/2", (req, res) => {
  console.log("Welcome papito!");
  res.send("<p>Nada Acontece Por Aqui</p>");
});

module.exports = router;