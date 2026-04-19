import { cambiarAPlanPremiumService } from "../services/usuario.services.js";

export const cambiarPlanAPremium = async (req, res) => {
        const usuarioId = req.decoded.id;
        const rol = req.decoded.rol;
        const resultado = await cambiarAPlanPremiumService(usuarioId, rol);
        res.status(200).json(resultado);
};