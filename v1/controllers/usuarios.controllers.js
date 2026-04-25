import { cambiarAPlanPremiumService, cambiarRolUsuarioService } from "../services/usuario.services.js";

export const cambiarPlanAPremium = async (req, res, next) => {
    try {
        const usuarioId = req.decoded.id;
        const rol = req.decoded.rol;

        const resultado = await cambiarAPlanPremiumService(usuarioId, rol);

        return res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const cambiarRolUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rol } = req.body;

        const usuarioActualizado = await cambiarRolUsuarioService(id, rol);

        return res.status(200).json(usuarioActualizado);
    } catch (error) {
        next(error);
    }
};