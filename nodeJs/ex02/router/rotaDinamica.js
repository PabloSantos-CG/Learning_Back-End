const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.json(req.params.id);
});

module.exports = router;