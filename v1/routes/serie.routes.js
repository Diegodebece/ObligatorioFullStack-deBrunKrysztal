import express from "express";
import { obtenerSeries, obtenerSeriePorId, crearSerie, actualizarSerie, eliminarSerie } from "../controllers/series.controllers.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js"; 
import { crearSerieSchema } from "../validators/series.validators.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerSeries);
router.get("/:id", obtenerSeriePorId);
router.post("/", authorize(["admin"]), crearSerie);
router.patch("/:id", authorize(["admin"]), validateBodyMiddleware(crearSerieSchema), actualizarSerie);
router.delete("/:id", authorize(["admin"]), eliminarSerie);

export default router;