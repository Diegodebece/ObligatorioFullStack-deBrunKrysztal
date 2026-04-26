import { obtenerSeriesService, obtenerSeriePorIdService, crearSerieService, actualizarSerieService, eliminarSerieService } from '../services/series.services.js';
import { crearSerieSchema } from "../validators/series.validators.js";

import { upload } from "../middlewares/multer.middleware.js";
import cloudinary from "../config/cloudinary.js";
import { runMulterSingle } from "../utils/multer.util.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.util.js";

export const obtenerSeries = async (req, res, next) => {
    try {
        const series = await obtenerSeriesService();
        if(series.length === 0) {
            return res.status(200).json({ success: true, message: "No hay series disponibles", data: [] });
        }
        return res.status(200).json({ success: true, message: "Series obtenidas correctamente", data: series });
        
    } 
    catch (error) {
        next(error);
    }
};   
    
export const obtenerSeriePorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const serie = await obtenerSeriePorIdService(id);
        return res.status(200).json({ success: true, message: "Serie obtenida correctamente", data: serie });
    } 
    catch (error) {
        next(error);
    }       
};

export const crearSerie = async (req, res, next) => {
    try {
        await runMulterSingle(upload, "imagen", req, res);

        if (!req.file) {
            const error = new Error("La imagen es obligatoria");
            error.status = 400;
            throw error;
        }

        const result = await uploadBufferToCloudinary(cloudinary, req.file.buffer, {
            resource_type: "auto",
            folder: "series"
        });

        const serieConImagen = {...req.body, imagen: result.secure_url};
        const { error, value } = crearSerieSchema.validate(serieConImagen, { abortEarly: false });
        if (error) {
            const validationError = new Error("Error de validación");
            validationError.status = 400;
            validationError.details = error.details.map(detail => detail.message);
            throw validationError;
        }
        const serieCreada = await crearSerieService(value);
        return res.status(201).json({ success: true, message: "Serie creada correctamente", data: serieCreada });
    } 
    catch (error) {
        next(error);
    }
};

export const actualizarSerie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const serieActualizada = await actualizarSerieService(id, req.validatedBody);
        return res.status(200).json({ success: true, message: "Serie actualizada correctamente", data: serieActualizada });
    } catch (error) {
        next(error);
    }
};

export const eliminarSerie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const serieEliminada = await eliminarSerieService(id);
        return res.status(200).json({ success: true, message: "Serie eliminada correctamente", data: serieEliminada });
    } catch (error) {
        next(error);
    }
}