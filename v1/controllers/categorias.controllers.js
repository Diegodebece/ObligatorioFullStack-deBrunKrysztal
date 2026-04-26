import { obtenerCategoriasService, obtenerCategoriaPorIdService, crearCategoriaService, actualizarCategoriaService, eliminarCategoriaService } from "../services/categoria.services.js";

export const obtenerCategorias = async (req, res, next) => {
    try {
        const categorias = await obtenerCategoriasService();
        return res.status(200).json({ success: true, message: "Categorías obtenidas correctamente", data: categorias });
    } catch (error) {
        next(error);
    }
};

export const obtenerCategoriaPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoria = await obtenerCategoriaPorIdService(id);
        return res.status(200).json({ success: true, message: "Categoría obtenida correctamente", data: categoria });
    } catch (error) {
        next(error);
    }
};

export const crearCategoria = async (req, res, next) => {
    try {
        const categoriaCreada = await crearCategoriaService(req.validatedBody);
        return res.status(201).json({ success: true, message: "Categoría creada correctamente", data: categoriaCreada });
    } catch (error) {
        next(error);
    }
};

export const actualizarCategoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoriaActualizada = await actualizarCategoriaService(id, req.validatedBody);
        return res.status(200).json({ success: true, message: "Categoría actualizada correctamente", data: categoriaActualizada });
    } catch (error) {
        next(error);
    }
};

export const eliminarCategoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        await eliminarCategoriaService(id);
        return res.status(200).json({ success: true, message: "Categoría eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};
