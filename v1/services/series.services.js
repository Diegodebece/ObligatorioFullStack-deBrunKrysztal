import Serie from "../models/serie.model.js";

export const obtenerSeriesService = async () => {
    const series = await Serie.find();
    return series;
}

export const obtenerSeriePorIdService = async (id) => {
    const serie = await Serie.findById(id);
    return serie;
}

export const crearSerieService = async (serie) => {
    const nuevaSerie = new Serie(serie);
    await nuevaSerie.save();
    return nuevaSerie;
}

export const actualizarSerieService = async (id, serie) => {
    const serieActualizada = await Serie.findByIdAndUpdate(id, serie, { returnDocument: "after" });
    return serieActualizada;
}

export const eliminarSerieService = async (id) => {
    const serieEliminada = await Serie.findByIdAndDelete(id);
    return serieEliminada;
}
