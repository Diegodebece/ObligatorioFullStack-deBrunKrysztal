import express from "express";
import { obtenerSeguimientos, obtenerSeguimientoPorId, crearSeguimiento, actualizarSeguimiento, eliminarSeguimiento, generarRecomendaciones, obtenerSeriesMasVistas } from "../controllers/seguimientos.controllers.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js"; 
import { crearSeguimientoSchema } from "../validators/seguimientos.validators.js";


const router = express.Router({ mergeParams: true });


router.get("/", obtenerSeguimientos);
router.get("/trending", obtenerSeriesMasVistas);
router.get("/recomendaciones", generarRecomendaciones);

router.post("/", validateBodyMiddleware(crearSeguimientoSchema), crearSeguimiento);

router.patch("/:id", validateBodyMiddleware(crearSeguimientoSchema), actualizarSeguimiento);
router.get("/:id", obtenerSeguimientoPorId);
router.delete("/:id", eliminarSeguimiento);

export default router;