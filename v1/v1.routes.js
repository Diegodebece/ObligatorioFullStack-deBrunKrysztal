import express from 'express';
import { authenticateMiddleware } from './middlewares/authenticate.middleware.js';
import authRouter from './routes/auth.routes.js';
import seriesRouter from './routes/serie.routes.js';
import usuarioRouter from './routes/usuario.routes.js';
import categoriaRouter from './routes/categoria.routes.js';
import seguimientoRouter from './routes/seguimiento.routes.js';
import uploadsRouter from './routes/uploads.routes.js';
import aiRouter from './routes/ai.routes.js';

const router = express.Router({ mergeParams: true});

//rutas desprotegidas
router.use("/uploads", uploadsRouter);
router.use("/ai", aiRouter);
router.use("/auth", authRouter);

router.use(authenticateMiddleware);


//rutas protegidas

router.use("/series", seriesRouter);
router.use("/usuarios", usuarioRouter);
router.use("/seguimientos", seguimientoRouter);
router.use("/categorias", categoriaRouter);

export default router;
