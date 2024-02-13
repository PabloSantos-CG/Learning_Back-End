import { Router } from "express";
import indexController from "../controllers/indexController";
import auth from "../middlewares/auth";

const router = Router();

router.get("/list", auth.private, indexController.list);
router.post("/register", indexController.register);
router.post("/login", indexController.login);

export default router;
