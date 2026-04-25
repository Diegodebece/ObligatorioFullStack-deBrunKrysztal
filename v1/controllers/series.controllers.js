import { obtenerSeriesService, obtenerSeriePorIdService, crearSerieService, actualizarSerieService, eliminarSerieService } from '../services/series.services.js';
import { crearSerieSchema } from "../validators/series.validators.js";

import { upload } from "../middlewares/multer.middleware.js";
import cloudinary from "../config/cloudinary.js";
import { runMulterSingle } from "../utils/multer.util.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.util.js";

export const obtenerSeries = async (req, res) => {
    const series = await obtenerSeriesService();
    if(series.length === 0) return res.status(204).json({ message: "No hay series disponibles" });
    res.status(200).json(series);
}

export const obtenerSeriePorId = async (req, res) => {
    const { id } = req.params;
    const serie = await obtenerSeriePorIdService(id);

    
    res.status(200).json(serie);
}

export const crearSerie = async (req, res, next) => {
    try {
        await runMulterSingle(upload, "imagen", req, res);

        if (!req.file) {
            return res.status(400).json({ error: "No se subió ninguna imagen" });
        }

        const result = await uploadBufferToCloudinary(cloudinary, req.file.buffer, {
            resource_type: "auto",
            folder: "series"
        });

        const serieConImagen = {...req.body, imagen: result.secure_url};
        const { error } = crearSerieSchema.validate(serieConImagen);
        if (error) {
            return res.status(400).json({ error: "Error de validación" });
        }
        const serieCreada = await crearSerieService(serieConImagen);
        return res.status(201).json(serieCreada);

    } catch (error) {
        return res.status(error.status || 500).json({
        error: error.message || "Error al crear la serie"
        });
    }
};

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