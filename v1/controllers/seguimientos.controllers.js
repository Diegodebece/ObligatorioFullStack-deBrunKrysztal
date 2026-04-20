import {
    obtenerSeguimientosService,
    obtenerSeguimientoPorIdService,
    crearSeguimientoService,
    actualizarSeguimientoService,
    eliminarSeguimientoService
} from "../services/seguimiento.services.js";

export const obtenerSeguimientos = async (req, res) => {
    const seguimientos = await obtenerSeguimientosService();
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
    const seguimientoData = req.body;
    try {
        const nuevoSeguimiento = await crearSeguimientoService(seguimientoData);
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