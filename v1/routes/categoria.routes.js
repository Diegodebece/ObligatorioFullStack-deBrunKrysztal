import express from "express";
import { obtenerCategorias, obtenerCategoriaPorId, crearCategoria, actualizarCategoria, eliminarCategoria } from "../controllers/categorias.controllers.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearCategoriaSchema } from "../validators/categorias.validators.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerCategorias);
router.get("/:id", obtenerCategoriaPorId);
router.post("/", authorize(["admin"]), validateBodyMiddleware(crearCategoriaSchema), crearCategoria);
router.patch("/:id", authorize(["admin"]), validateBodyMiddleware(crearCategoriaSchema), actualizarCategoria);
router.delete("/:id", authorize(["admin"]), eliminarCategoria);

export default router;