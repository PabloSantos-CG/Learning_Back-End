import express from "express";
import Task from "../models/task";
import Checklist from "../models/checklist";

const router = express.Router();

router.get("/:id/tasks/new", async (req, res) => {
  try {
    let task = new Task();
    res.status(200).render("tasks/new", { checklistId: req.params.id, task });
  } catch (error) {
    res.status(500).render("pages/error", { err: "Erro ao criar tarefa" });
  }
});

router.post("/:id/tasks", async (req, res) => {
  let { name } = req.body.task;
  let task = new Task({name, checklist: req.params.id});

  try {
    await task.save();
    let checklist = await Checklist.findById(req.params.id);
    checklist?.tasks.push(task._id);
    res.redirect(`/checklists/${req.params.id}`);

  } catch (error) {
    res.status(422).render("tasks/new", { task: { ...task, error } });
  }
});


export default router;