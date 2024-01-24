import express from "express";
import Checklist from "../models/checklist";

const router = express.Router();

//CRUD - Create, Read, Update, Delete

//Create
router.post("/", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({name});

  try {
    await checklist.save();
    res.redirect("/checklists");

  } catch (error) {
    res.status(422).render("checklists/new", { checklist: { ...checklist, error } });
  }
});

//Read
router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    res.status(200).render("checklists/index", { checklists });

  } catch (error) {
    res.status(422).render("pages/error", { err: "Erro ao exibir as listas" });
  }
});

router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist });

  } catch (error) {
    res.status(500).render("pages/error", { err: "Erro ao criar listas" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.render("checklists/edit", { checklist });

  } catch (error) {
    res.status(500).render("pages/error", { err: "Erro ao exibir a edição de lista" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate("tasks");
    res.status(200).render("checklists/show", { checklist });

  } catch (error) {
    res.status(422).render("pages/error", { error });
  }
});

//Update
router.put("/:id", async (req, res) => {
  let checklist;
  try {
    let { name } = req.body.checklist;
    checklist = await Checklist.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.status(200).redirect("/checklists");
    
  } catch (error) {
    res.status(422).render("checklists/edit", { checklist: { ...checklist, error }});
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    await Checklist.findByIdAndDelete(req.params.id);
    res.status(200).redirect("/checklists");

  } catch (error) {
    res.status(422).redirect("pages/error");
  }
});

export default router;
