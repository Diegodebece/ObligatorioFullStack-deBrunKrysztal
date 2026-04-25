import express from "express";
import { obtenerSeguimientos, obtenerSeguimientoPorId, crearSeguimiento, actualizarSeguimiento, eliminarSeguimiento } from "../controllers/seguimientos.controllers.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js"; 
import { crearSeguimientoSchema } from "../validators/seguimientos.validators.js";
//import router from "./serie.routes.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerSeguimientos);
router.get("/:id", obtenerSeguimientoPorId);
router.post("/", validateBodyMiddleware(crearSeguimientoSchema), crearSeguimiento);
router.patch("/:id", validateBodyMiddleware(crearSeguimientoSchema), actualizarSeguimiento);
router.delete("/:id", eliminarSeguimiento);

export default router;