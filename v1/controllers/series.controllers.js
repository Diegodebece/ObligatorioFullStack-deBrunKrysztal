import { obtenerSeriesService, obtenerSeriePorIdService, crearSerieService, actualizarSerieService, eliminarSerieService } from '../services/series.services.js';

export const obtenerSeries = async (req, res) => {
    const series = await obtenerSeriesService();
    res.status(200).json(series);
}

export const obtenerSeriePorId = async (req, res) => {
    const { id } = req.params;
    const serie = await obtenerSeriePorIdService(id);
    res.status(200).json(serie);
}

export const crearSerie = async (req, res) => {
    const serieCreada = await crearSerieService(req.validatedBody);
    res.status(201).json(serieCreada);
}

export const actualizarSerie = async (req, res) => {
    const { id } = req.params;
    const serieActualizada = await actualizarSerieService(id, req.validatedBody);
    res.status(200).json(serieActualizada);
}

export const eliminarSerie = async (req, res) => {
    const { id } = req.params;
    const serieEliminada = await eliminarSerieService(id);
    res.status(204).send();
}