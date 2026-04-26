export const errorMiddleware = (err, req, res, next) => {
    const response = { message: err.message || "Error interno del servidor",};
    if (err.details) { response.details = err.details; }
    res.status(err.status || 500).json(response);
}