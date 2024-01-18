import express from "express";
import Checklist from "../models/checklist";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let checklist = await Checklist.find({});
    console.log("Checklists encontrados: ", checklist);
    res.status(200).json(req.body);
  } catch (error) {
    console.log("Ocorreu um erro", error);
    res.status(422);
  }
});

router.post("/", async (req, res) => {
  let { name } = req.body;
  
  try {
    let checklist = await Checklist.create({ name });
    console.log("Checklist recebido: ", checklist);
    res.status(200).json(req.body);
  } catch (error) {
    console.log("Ocorreu um erro", error);
    res.status(422);
  }
});

export default router;