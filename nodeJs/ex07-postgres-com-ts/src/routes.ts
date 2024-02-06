import express from "express";
import { candidatesController } from "./controllers/candidatesController";

const router = express.Router();

router.get("/candidates", candidatesController.index);

export default router;