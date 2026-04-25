
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.decoded) {
            return res.status(401).json({ error: "Acceso no autorizado" });
        }

        if (!roles.includes(req.decoded.rol)) {
            return res.status(403).json({ error: "No tienes permisos para realizar esta acción" });
        }

        next();
    };
};

export default authorize;