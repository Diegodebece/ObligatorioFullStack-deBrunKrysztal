import express from "express";
import { obtenerSeries, obtenerSeriePorId, crearSerie, actualizarSerie, eliminarSerie } from "../controllers/series.controllers.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js"; 
import { crearSerieSchema } from "../validators/series.validators.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerSeries);
router.get("/:id", obtenerSeriePorId);
router.post("/", validateBodyMiddleware(crearSerieSchema), crearSerie);
router.patch("/:id", validateBodyMiddleware(crearSerieSchema), actualizarSerie);
router.delete("/:id", eliminarSerie);

export default router;