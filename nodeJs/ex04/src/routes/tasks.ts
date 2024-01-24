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
  let task = new Task({ name, checklist: req.params.id });

  try {
    await task.save();
    let checklist = await Checklist.findById(req.params.id);
    checklist?.tasks.push(task._id);
    await checklist?.save();
    res.redirect(`/checklists/${req.params.id}`);
  } catch (error) {
    res
      .status(422)
      .render("tasks/new", {
        task: { ...task, error },
        checklistId: req.params.id,
      });
  }
});

router.put("/task/:id", async (req, res) => {
  let task = await Task.findById(req.params.id);

  try {
    task?.set(req.body.task);
    await task?.save();
    res.status(200).json({ task });
  } catch (error) {
    res.status(422).json({ error });
  }
});

router.delete("/task/:id", async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id);
    let checklist = await Checklist.findById(task?.checklist);
    let indexToRemove = checklist?.tasks.indexOf(task?._id);
    checklist?.tasks.splice(indexToRemove!, 1);
    await checklist?.save();
    res.redirect(`/checklists/${checklist?._id}`);
  } catch (error) {
    res.status(500).render("pages/error", { err: "Erro ao deletar tarefa" });
  }
});

export default router;
