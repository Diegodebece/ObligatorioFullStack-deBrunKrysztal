import Categoria from "../models/categoria.model.js";

export const crearCategoriaService = async (categoriaData) => {
    const { nombre, descripcion, activa } = categoriaData;
    const categoriaExistente = await Categoria.findOne({ nombre: nombre });

    if (categoriaExistente) {
        const error = new Error("Ya existe una categoría con ese nombre");
        error.status = 409;
        throw error;
    }

    const nuevaCategoria = new Categoria({ nombre, descripcion, activa });
    return await nuevaCategoria.save();
};

export const obtenerCategoriasService = async (page, limit) => {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 5;
    const skip = (pageNumber - 1) * limitNumber;
    return await Categoria.find().skip(skip).limit(limitNumber);
};

export const obtenerCategoriaPorIdService = async (id) => {
    const categoria = await Categoria.findById(id);

    if (!categoria) {
        const error = new Error("Categoría no encontrada");
        error.status = 404;
        throw error;
    }

    return categoria;
};


export const actualizarCategoriaService = async (id, categoria) => {

    const categoriaActual = await Categoria.findById(id);

    if (!categoriaActual) {
        const error = new Error("Categoría no encontrada");
        error.status = 404;
        throw error;
    }

    if (categoria.nombre) {

        const categoriaExistente = await Categoria.findOne({nombre: categoria.nombre});

        if (categoriaExistente && categoriaExistente._id.toString() !== id) 
            {
                const error = new Error("Ya existe una categoría con ese nombre");
                error.status = 409;
                throw error;
            }
        }

    const categoriaActualizada = await Categoria.findByIdAndUpdate(id,categoria,{ returnDocument: "after", runValidators: true});
    return categoriaActualizada;
};

export const eliminarCategoriaService = async (id) => {
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    if (!categoriaEliminada) {
        const error = new Error("Categoría no encontrada");
        error.status = 404;
        throw error;
    }

    return categoriaEliminada;
};