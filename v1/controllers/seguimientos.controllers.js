import {
    obtenerSeguimientosService,
    obtenerSeguimientoPorIdService,
    crearSeguimientoService,
    actualizarSeguimientoService,
    eliminarSeguimientoService,
    generarRecomendacionesService,
    obtenerSeriesMasVistasService
} from "../services/seguimiento.services.js";

export const obtenerSeguimientos = async (req, res) => {
    const seguimientos = await obtenerSeguimientosService();
    if (!seguimientos || seguimientos.length === 0) {
        return res.status(404).json({ message: "No se encontraron seguimientos" });
    }
    res.status(200).json(seguimientos);
}

export const obtenerSeguimientoPorId = async (req, res) => {
    const { id } = req.params;
    const seguimiento = await obtenerSeguimientoPorIdService(id);
    if (!seguimiento) {
        return res.status(404).json({ message: "Seguimiento no encontrado" });
    }
    res.status(200).json(seguimiento);
}

export const crearSeguimiento = async (req, res) => {

    try {
        const seguimientoData = req.body;

        // id del usuario autenticado sacado del token
        const usuario = req.decoded.id;
        const nuevoSeguimiento = await crearSeguimientoService({
            ...seguimientoData,
            usuario
        });
        res.status(201).json(nuevoSeguimiento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const actualizarSeguimiento = async (req, res) => {
    const { id } = req.params;
    const seguimientoData = req.body;
    try {
        const seguimientoActualizado = await actualizarSeguimientoService(id, seguimientoData);
        res.status(200).json(seguimientoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const eliminarSeguimiento = async (req, res) => {
    const { id } = req.params;
    try {
        const seguimientoEliminado = await eliminarSeguimientoService(id);
        res.status(200).json(seguimientoEliminado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const generarRecomendaciones = async (req, res, next) => {
    const idUsuario = req.decoded.id;
    
    try {
        const recomendaciones = await generarRecomendacionesService(idUsuario);
        res.json({
            message: "Recomendación generada correctamente",
            final: recomendaciones
        });
    } catch (error) {
        next(error);
    }
}

export const obtenerSeriesMasVistas = async (req, res, next) => {
    try {
        const series = await obtenerSeriesMasVistasService();

        res.json({
            message: "Series más miradas obtenidas correctamente",
            data: series
        });
    } catch (error) {
        next(error);
    }
};