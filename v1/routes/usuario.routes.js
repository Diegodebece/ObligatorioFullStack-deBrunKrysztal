import express from "express";
import { cambiarPlanAPremium } from "../controllers/usuarios.controllers.js";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.patch("/me/plan", authenticateMiddleware, cambiarPlanAPremium);

export default router;