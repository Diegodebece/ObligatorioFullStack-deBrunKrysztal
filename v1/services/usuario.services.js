import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";

export const obtenerUsuariosService = async (page, limit) => {
  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.min(Math.max(Number(limit) || 5, 1), 50);
  const skip = (pageNumber - 1) * limitNumber;

  const [usuarios, totalItems] = await Promise.all([
    Usuario.find().skip(skip).limit(limitNumber),
    Usuario.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalItems / limitNumber);

  return {
    data: usuarios,
    pagination: {
      totalItems,
      totalPages,
      currentPage: pageNumber,
      limit: limitNumber,
      hasNextPage: pageNumber < totalPages,
      hasPrevPage: pageNumber > 1,
      nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
      prevPage: pageNumber > 1 ? pageNumber - 1 : null,
    },
  };
};


export const obtenerUsuarioPorIdService = async (id) => {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }
    return usuario;
};

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
        error.status = 409;
        throw error;
    }

    usuario.plan = "premium";
    await usuario.save();

        const token = jwt.sign(
        {
            id: usuario._id,
            rol: usuario.rol,
            plan: usuario.plan
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );

    return {
        usuario: {
            id: usuario._id,
            rol: usuario.rol,
            plan: usuario.plan
        },
        token
    };
    
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


