import "dotenv/config";
import express from 'express';
//import dotenv from "dotenv";
import cors from "cors";
import v1Router from "./v1/v1.routes.js";
import { notFoundMiddleware } from './v1/middlewares/notFound.middleware.js';
import { errorMiddleware } from './v1/middlewares/error.middleware.js';
import connectDB from "./v1/config/db.config.js";

//dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res) => {
    res.send("Respuesta desde el servidor a la raiz")
})

app.use("/v1", v1Router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app; 