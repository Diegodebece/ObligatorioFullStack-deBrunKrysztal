export const validateUser = (req, res, next) => {
    const usuarioIdSolicitado = req.params.usuarioId;
    const usuarioLogueadoId = req.decoded.id;

    // if (usuarioIdSolicitado !== usuarioLogueadoId) {
    //     return res.status(403).json({
    //         success: false,
    //         message: "No tienes permiso para acceder a estos seguimientos"
    //     });
    // }

    next();
};