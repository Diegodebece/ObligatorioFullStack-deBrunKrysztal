import express from 'express';
import { authenticateMiddleware } from './middlewares/authenticate.middleware.js';
import authRouter from './routes/auth.routes.js';

const router = express.Router({ mergeParams: true});

//rutas desprotegidas

router.use("/auth", authRouter);
router.use(authenticateMiddleware)

//rutas protegidas


export default router;