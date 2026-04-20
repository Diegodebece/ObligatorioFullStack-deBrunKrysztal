import{
    obtenerCategoriasService,
    obtenerCategoriaPorIdService,
    actualizarCategoriaService,
    eliminarCategoriaService,
    crearCategoriaService
} from "../services/categoria.services.js";

export const crearCategoria = async (req, res) => {
    try {
        const categoriaCreada = await crearCategoriaService(req.body);  
        res.status(201).json(categoriaCreada);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const obtenerCategorias = async (req, res) => {
    const categorias = await obtenerCategoriasService();
    res.status(200).json(categorias);
}

export const obtenerCategoriaPorId = async (req, res) => {
    const { id } = req.params;
    const categoria = await obtenerCategoriaPorIdService(id);
    res.status(200).json(categoria);
}

export const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const categoriaActualizada = await actualizarCategoriaService(id, req.body);
    res.status(200).json(categoriaActualizada);
}

export const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    await eliminarCategoriaService(id);
    res.status(204).send();
}