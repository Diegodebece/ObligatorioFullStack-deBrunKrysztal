import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearCategoriaSchema } from "../validators/categorias.validators.js";
import { crearCategoria } from "../controllers/categorias.controllers.js";


const router = express.Router({ mergeParams: true });

router.post("/", validateBodyMiddleware(crearCategoriaSchema), crearCategoria);

router.get("/", (req, res) => {
    res.status(200).json({ message: "Lista de categorías" });
});

export default router;