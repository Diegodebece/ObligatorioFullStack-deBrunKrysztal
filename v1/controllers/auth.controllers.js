import {registrarUsuarioService, loginUsuarioService} from "../services/auth.services.js";

export const registrarUsuario = async (req, res) => {
    const { usuario, token } = await registrarUsuarioService(req.validatedBody);
    res.json({ message: "Usuario registrado", token });
}

export const loginUsuario = async (req, res) => {
    const { email, password } = req.validatedBody;
    const result = await loginUsuarioService(email, password);
    if(result.message) return res.status(400).json(result);
    res.json({ message: "Usuario logueado", ...result });
}
