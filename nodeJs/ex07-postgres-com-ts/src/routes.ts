import express from "express";
import { candidatesController } from "./controllers/candidatesController";
import { companiesController } from "./controllers/companiesController";
import { jobsController } from "./controllers/jobsController";


const router = express.Router();

router.get("/", async (req, res) => res.json({ ping: "pong" }));

//candidates table
router.get("/candidates", candidatesController.index);
router.post("/candidates", candidatesController.save);

router.get("/candidates/:id", candidatesController.show);
router.put("/candidates/:id", candidatesController.update);
router.delete("/candidates/:id", candidatesController.delete);

//companies table
router.get("/companies", companiesController.index);
router.post("/companies", companiesController.save);

router.get("/companies/:id", companiesController.show);
router.put("/companies/:id", companiesController.update);
router.delete("/companies/:id", companiesController.delete);

//jobs table
router.get("/jobs", jobsController.index);
router.post("/jobs", jobsController.save);

router.get("/jobs/:id", jobsController.show);
router.put("/jobs/:id", jobsController.update);
router.delete("/jobs/:id", jobsController.delete);

router.post("/jobs/:id/addCandidate", jobsController.addCandidate);
router.post("/jobs/:id/removeCandidate", jobsController.removeCandidate);

export default router;