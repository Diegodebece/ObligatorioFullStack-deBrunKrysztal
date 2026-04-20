import Joi from "joi";

export const crearSeguimientoSchema = Joi.object({
    estado: Joi.string().valid("pendiente", "viendo", "terminada").default("pendiente").required().messages({
        "string.base": "El estado debe ser un texto",
        "any.only": "El estado debe ser 'pendiente', 'viendo' o 'terminada'"
    }),
    esFavorita: Joi.boolean().default(false).messages({
        "boolean.base": "esFavorita debe ser un valor booleano"
    }),
    ratingPersonal: Joi.number().integer().min(1).max(10).default(null).messages({
        "number.base": "El rating personal debe ser un número",
        "number.integer": "El rating personal debe ser un número entero",
        "number.min": "El rating personal debe ser al menos 1",
        "number.max": "El rating personal no puede ser mayor a 10"
    }),
    episodioActual: Joi.number().integer().min(0).max(9999).default(null).messages({
        "number.base": "El episodio actual debe ser un número",
        "number.integer": "El episodio actual debe ser un número entero"
    }),
    temporadaActual: Joi.number().integer().min(0).max(9999).default(null).messages({
        "number.base": "La temporada actual debe ser un número",
        "number.integer": "La temporada actual debe ser un número entero"
    }),
    fechaInicio: Joi.date().default(null).messages({
        "date.base": "La fecha de inicio debe ser una fecha válida"
    }),
    fechaFin: Joi.date().greater(Joi.ref("fechaInicio")).default(null).messages({
        "date.base": "La fecha de fin debe ser una fecha válida",
        "date.greater": "La fecha de fin debe ser posterior a la fecha de inicio"
    })
});