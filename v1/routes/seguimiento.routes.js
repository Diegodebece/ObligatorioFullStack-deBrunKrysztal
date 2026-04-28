import express from "express";
import { obtenerSeguimientos, obtenerSeguimientoPorId, crearSeguimiento, actualizarSeguimiento, eliminarSeguimiento, generarRecomendaciones, obtenerSeriesMasVistas } from "../controllers/seguimientos.controllers.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js"; 
import { crearSeguimientoSchema } from "../validators/seguimientos.validators.js";
import { validateUser } from "../middlewares/validateUser.middleware.js";

const router = express.Router({ mergeParams: true });


router.get("/", obtenerSeguimientos);
router.get("/trending", obtenerSeriesMasVistas);
router.get("/recomendaciones", validateUser, generarRecomendaciones);

router.post("/", validateBodyMiddleware(crearSeguimientoSchema), crearSeguimiento);

router.patch("/:id", validateUser, validateBodyMiddleware(crearSeguimientoSchema), actualizarSeguimiento);
router.get("/:id", validateUser, obtenerSeguimientoPorId);
router.delete("/:id", validateUser, eliminarSeguimiento);

export default router;