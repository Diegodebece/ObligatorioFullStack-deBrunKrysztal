import Seguimiento from "../models/seguimiento.model.js";

export const obtenerSeguimientosService = async () =>{
    const seguimientos = await Seguimiento.find();
    return seguimientos;
}

export const obtenerSeguimientoPorIdService = async (id) =>{
    const seguimiento = await Seguimiento.findById(id);
    return seguimiento;
}

export const crearSeguimientoService = async (seguimientoData) =>{
    const nuevoSeguimiento = new Seguimiento(seguimientoData);
    await nuevoSeguimiento.save();
    return nuevoSeguimiento;
}

export const actualizarSeguimientoService = async (id, seguimientoData) =>{
    const seguimientoActualizado = await Seguimiento.findByIdAndUpdate(id, seguimientoData, { returnDocument: "after" });
    return seguimientoActualizado;
}

export const eliminarSeguimientoService = async (id) =>{
    const seguimientoEliminado = await Seguimiento.findByIdAndDelete(id);
    return seguimientoEliminado;
}