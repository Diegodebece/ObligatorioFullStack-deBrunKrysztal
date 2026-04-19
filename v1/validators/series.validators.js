import Joi from "joi";

export const crearSerieSchema = Joi.object({
    titulo: Joi.string().trim().min(3).max(100).required().messages({
        "string.base": "El título debe ser un texto",
        "string.empty": "El título no puede estar vacío",
        "string.min": "El título debe tener al menos {#limit} caracteres",
        "string.max": "El título no puede tener más de {#limit} caracteres",
        "any.required": "El título es obligatorio",
        "any.unique": "El título ya está en uso"
    }),

    descripcion: Joi.string().max(500).optional().messages({
        "string.base": "La descripción debe ser un texto",
        "string.max": "La descripción no puede tener más de {#limit} caracteres"
    }),

    plataforma: Joi.string().min(1).max(50).required().messages({
        "string.base": "La plataforma debe ser un texto",
        "string.empty": "La plataforma no puede estar vacía",
        "string.min": "La plataforma no puede estar vacía",
        "string.max": "La plataforma no puede tener más de {#limit} caracteres",
        "any.required": "La plataforma es obligatoria"
    }),

    cantidadTemporadas: Joi.number().integer().min(1).default(1).required().messages({
        "number.base": "La cantidad de temporadas debe ser un número",
        "number.integer": "La cantidad de temporadas debe ser un número entero",
        "number.min": "La cantidad de temporadas debe ser al menos 1",
        "any.required": "La cantidad de temporadas es obligatoria"
    }),

    episodiosPorTemporada: Joi.number().integer().min(1).default(1).required().messages({
        "number.base": "La cantidad de episodios por temporada debe ser un número",
        "number.integer": "La cantidad de episodios por temporada debe ser un número entero",
        "number.min": "La cantidad de episodios por temporada debe ser al menos 1",
        "any.required": "La cantidad de episodios por temporada es obligatoria"
    }),

    minutosPorEpisodio: Joi.number().min(1).default(1).required().messages({
        "number.base": "Los minutos por episodio deben ser un número",
        "number.min": "Los minutos por episodio deben ser al menos 1",
        "any.required": "Los minutos por episodio son obligatorios"
    }),

    categoria: Joi.string().required().messages({
        "string.base": "La categoría debe ser un texto",
        "string.empty": "La categoría no puede estar vacía",
        "any.required": "La categoría es obligatoria"
    })
});