import {
    obtenerSeguimientosService,
    obtenerSeguimientosDeUsuarioService,
    obtenerSeguimientoPorIdService,
    crearSeguimientoService,
    actualizarSeguimientoService,
    eliminarSeguimientoService,
    generarRecomendacionesService,
    obtenerSeriesMasVistasService
} from "../services/seguimiento.services.js";

export const obtenerSeguimientos = async (req, res, next) => {
    try {
        const { page, limit } = req.query;

        const resultado = await obtenerSeguimientosService(page, limit);

        return res.status(200).json({
            success: true,
            message: "Seguimientos obtenidos correctamente",
            ...resultado
        });
    } catch (error) {
        next(error);
    }
};



export const obtenerSeguimientosDeUsuario = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const idUsuario = req.decoded.id;

        const seguimientos = await obtenerSeguimientosDeUsuarioService(idUsuario, page, limit);

        res.status(200).json({
            success: true,
            message: "Seguimientos del usuario obtenidos correctamente",
            ...seguimientos
        });

    } catch (error) {
        next(error);
    }
};

export const obtenerSeguimientoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuarioLogueado = req.decoded.id;
        const seguimiento = await obtenerSeguimientoPorIdService(id, usuarioLogueado);
        res.status(200).json(seguimiento);
    } catch (error) {
        next(error);
    }

}

export const crearSeguimiento = async (req, res, next) => {

    try {
        const seguimientoData = req.body;
        const usuario = req.decoded.id;
        const plan = req.decoded.plan;
        const nuevoSeguimiento = await crearSeguimientoService({
            ...seguimientoData,
            usuario,
            plan
        });
        res.status(201).json(nuevoSeguimiento);
    } catch (error) {
        next(error);
    }
}

export const actualizarSeguimiento = async (req, res, next) => {
    const { id } = req.params;
    const seguimientoData = req.body;
    try {
        const seguimientoActualizado = await actualizarSeguimientoService(id, seguimientoData);
        res.status(200).json(seguimientoActualizado);
    } catch (error) {
        next(error);
    }
}

export const eliminarSeguimiento = async (req, res, next) => {
    const { id } = req.params;
    try {
        const seguimientoEliminado = await eliminarSeguimientoService(id);
        res.status(200).json(seguimientoEliminado);
    } catch (error) {
        next(error);
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