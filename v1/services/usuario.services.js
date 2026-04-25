import Usuario from "../models/usuario.model.js";

export const obtenerUsuariosService = async () => {
    const usuarios = await Usuario.find();
    return usuarios;
}

export const obtenerUsuarioPorIdService = async (id) => {
    const usuario = await Usuario.findById(id);
    return usuario;
}

export const cambiarAPlanPremiumService = async (usuarioId, rol) => {
    if (rol !== "viewer") {
        const error = new Error("Este usuario no puede cambiar de plan");
        error.status = 403;
        throw error;
    }

    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }

    if (usuario.rol !== "viewer") {
        const error = new Error("Este tipo de usuario no puede cambiar de plan");
        error.status = 403;
        throw error;
    }

    if (usuario.plan !== "plus") {
        const error = new Error("Solo se puede cambiar a premium desde el plan plus");
        error.status = 400;
        throw error;
    }

    usuario.plan = "premium";
    await usuario.save();

    return {
        message: "Plan cambiado a premium exitosamente",
        plan: usuario.plan
    }
};

export const cambiarRolUsuarioService = async (id, rol) => {

    if (!["admin", "viewer"].includes(rol)) {
        const error = new Error("Rol inválido");
        error.status = 400;
        throw error;
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }

    if (usuario.rol === rol) {
        const error = new Error(`El usuario ya tiene el rol ${rol}`);
        error.status = 409;
        throw error;
    }

    usuario.rol = rol;

    await usuario.save();

    return usuario;
};

