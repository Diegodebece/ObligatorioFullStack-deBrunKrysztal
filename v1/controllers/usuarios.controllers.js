import { obtenerUsuariosService, obtenerUsuarioPorIdService, cambiarAPlanPremiumService, cambiarRolUsuarioService } from "../services/usuario.services.js";

export const obtenerUsuarios = async (req, res, next) => {
    try {
        const usuarios = await obtenerUsuariosService();
        return res.status(200).json({ success: true, message: "Usuarios obtenidos correctamente", data: usuarios });
    } catch (error) {
        next(error);
    }
}

export const obtenerUsuarioPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await obtenerUsuarioPorIdService(id);
        return res.status(200).json({ success: true, message: "Usuario obtenido correctamente", data: usuario });
    } catch (error) {
        next(error);
    }
}

export const cambiarPlanAPremium = async (req, res, next) => {
    try {
        const usuarioId = req.decoded.id;
        const rol = req.decoded.rol;

        const resultado = await cambiarAPlanPremiumService(usuarioId, rol);

        return res.status(200).json({ success: true, message: "Plan cambiado a premium exitosamente", data: resultado });
    } catch (error) {
        next(error);
    }
};

export const cambiarRolUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rol } = req.body;

        const usuarioActualizado = await cambiarRolUsuarioService(id, rol);

        return res.status(200).json({ success: true, message: "Rol de usuario actualizado correctamente", data: usuarioActualizado });
    } catch (error) {
        next(error);
    }
};