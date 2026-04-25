import express from "express";
import { cambiarPlanAPremium } from "../controllers/usuarios.controllers.js";
import { cambiarRolUsuario } from "../controllers/usuarios.controllers.js";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router({ mergeParams: true });

router.patch("/me/plan", authorize(["viewer"]), cambiarPlanAPremium);
router.patch("/:id/rol", authorize(["admin"]), cambiarRolUsuario);

export default router;