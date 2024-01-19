import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // coloca o caminho da view para o express encontrar //
  res.render("pages/index");
});

export default router;
