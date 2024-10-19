const express = require("express");
const teacherController = require("../../controllers/teacherController");

const router = express.Router();

router.get("/", async (req, res) => res.json({ ping: "pong" }));

router.get("/professor", teacherController.getAllTeachers);
router.post("/professor", teacherController.createTeacher);
router.get("/professor/:id", teacherController.getTeacherById);
router.put("/professor/:id", teacherController.updateTeacher);
router.delete("/professor/:id", teacherController.deleteTeacher);

module.exports = router;