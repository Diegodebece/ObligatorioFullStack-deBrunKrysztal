import express from 'express';
import { authenticateMiddleware } from './middlewares/authenticate.middleware.js';
import authRouter from './routes/auth.routes.js';
import seriesRouter from './routes/serie.routes.js';
import usuarioRouter from './routes/usuario.routes.js';
import seguimientoRouter from './routes/seguimiento.routes.js';

const router = express.Router({ mergeParams: true});

//rutas desprotegidas

router.use("/auth", authRouter);
router.use(authenticateMiddleware)

//rutas protegidas

router.use("/series", seriesRouter);
router.use("/usuarios", usuarioRouter);
router.use("/seguimientos", seguimientoRouter);

export default router;
