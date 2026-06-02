import Serie from "../models/serie.model.js";
import Categoria from "../models/categoria.model.js";

export const obtenerSeriesService = async (page, limit) => {
    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.min(Math.max(Number(limit) || 5, 1), 50);
    const skip = (pageNumber - 1) * limitNumber;

    const [series, totalItems] = await Promise.all([
        Serie.find()
            .skip(skip)
            .limit(limitNumber),
        Serie.countDocuments()
    ]);

    const totalPages = Math.ceil(totalItems / limitNumber);

    return {
        data: series,
        pagination: {
            totalItems,
            totalPages,
            currentPage: pageNumber,
            limit: limitNumber,
            hasNextPage: pageNumber < totalPages,
            hasPrevPage: pageNumber > 1,
            nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
            prevPage: pageNumber > 1 ? pageNumber - 1 : null
        }
    };
}


export const obtenerSeriePorIdService = async (id) => {
    const serie = await Serie.findById(id);
    if (!serie) {
        const error = new Error("No se encontro la serie");
        error.status = 404;
        throw error;
    }
    
    return serie;
}

export const crearSerieService = async (serie) => {
    const serieExistente = await Serie.findOne({ titulo: serie.titulo });
    
    if (serieExistente) {
        const error = new Error("Ya existe una serie con ese título");
        error.status = 409;
        throw error;
    }

    const categoriaExiste = await Categoria.findById(serie.categoria);

    if (!categoriaExiste) {
        const error = new Error("La categoría no existe");
        error.status = 404;
        throw error;
    }

    const nuevaSerie = new Serie(serie);
    await nuevaSerie.save();
    return nuevaSerie;
}

export const actualizarSerieService = async (id, serie) => {

    const serieActual = await Serie.findById(id);

    if (!serieActual) {
        const error = new Error("Serie no encontrada");
        error.status = 404;
        throw error;
    }

    if (serie.titulo) {

        const serieExistente = await Serie.findOne({ titulo: serie.titulo });

        if (serieExistente && serieExistente._id.toString() !== id) {
            const error = new Error("Ya existe una serie con ese título");
            error.status = 409;
            throw error;
        }
    }

    const serieActualizada = await Serie.findByIdAndUpdate(id, serie, { returnDocument: "after", runValidators: true });
    return serieActualizada;
};

export const eliminarSerieService = async (id) => {
    const serieEliminada = await Serie.findByIdAndDelete(id);

    if (!serieEliminada) {
        const error = new Error("No se encontro la serie");
        error.status = 404;
        throw error;
    }
    
    return serieEliminada;
}
