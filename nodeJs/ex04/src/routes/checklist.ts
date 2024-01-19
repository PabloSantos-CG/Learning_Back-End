import express from "express";
import Checklist from "../models/checklist";

const router = express.Router();

//CRUD - Create, Read, Update, Delete

//Create
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

//Read
router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    res.status(200).render("checklists/index", { checklists });
    console.log("Checklists encontrados: ", checklists);
  } catch (error) {
    console.log("Ocorreu um erro", error);
    res.status(422).render("pages/error", { err: "Erro ao exibir as listas" });
  }
});

router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist });

  } catch (error) {
    console.log("Ocorreu um erro", error);
    res.status(500).render("pages/error", { err: "Erro ao criar listas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    console.log("Checklist encontrado: ", checklist);
    res.status(200).render("checklists/show", { checklist });
  } catch (error) {
    console.log("Ocorreu um erro", error);
    res.status(422).render("pages/error", { err: "Erro ao exibir as listas de tarefas" });
  }
});

//Update
router.put("/:id", async (req, res) => {
  try {
    let { name } = req.body;
    let checklist = await Checklist.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    console.log("Checklist encontrado: ", checklist);
    res.status(200).json(checklist);
  } catch (error) {
    console.log("Ocorreu um erro", error);
    res.status(422);
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndDelete(req.params.id);
    console.log("Checklist encontrado: ", checklist);
    res.status(200).json(checklist);
  } catch (error) {
    console.log("Ocorreu um erro", error);
    res.status(422);
  }
});

export default router;
