import { Router } from "express";
import indexController from "../controllers/indexController";


const router = Router();

router.post("/", indexController.login);

export default router;