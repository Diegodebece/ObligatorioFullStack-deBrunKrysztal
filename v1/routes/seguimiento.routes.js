import express from "express";
import { obtenerSeguimientos, obtenerSeguimientoPorId, crearSeguimiento, actualizarSeguimiento, eliminarSeguimiento, generarRecomendaciones, obtenerSeriesMasVistas } from "../controllers/seguimientos.controllers.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js"; 
import { crearSeguimientoSchema } from "../validators/seguimientos.validators.js";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";

const router = express.Router({ mergeParams: true });


router.get("/", obtenerSeguimientos);
router.get("/trending", obtenerSeriesMasVistas);
router.get("/recomendaciones", generarRecomendaciones);

router.post("/", authenticateMiddleware, validateBodyMiddleware(crearSeguimientoSchema), crearSeguimiento);

router.patch("/:id", authenticateMiddleware, validateBodyMiddleware(crearSeguimientoSchema), actualizarSeguimiento);
router.get("/:id", authenticateMiddleware, obtenerSeguimientoPorId);
router.delete("/:id", authenticateMiddleware, eliminarSeguimiento);

export default router;