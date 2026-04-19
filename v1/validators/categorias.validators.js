import Joi from "joi";

export const crearCategoriaSchema = Joi.object({
    nombre: Joi.string().min(3).max(50).required().messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos {#limit} caracteres",
        "string.max": "El nombre no puede tener más de {#limit} caracteres",
        "any.required": "El nombre es obligatorio"
    }),

    descripcion: Joi.string().max(255).optional().messages({
        "string.base": "La descripción debe ser un texto",
        "string.max": "La descripción no puede tener más de {#limit} caracteres"
    }),

    activa: Joi.boolean().optional().messages({
        "boolean.base": "El campo activa debe ser verdadero o falso"
    })
});
