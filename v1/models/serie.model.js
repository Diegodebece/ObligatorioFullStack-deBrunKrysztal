import mongoose from "mongoose";
import Categoria from "./categoria.model.js";

const serieSchema = new mongoose.Schema({
    
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String
    },
    plataforma: {
        type: String,
        required: true
    },
    cantidadTemporadas: {
        type: Number,
        required: true, 
        min: 1
    },
    episodiosPorTemporada: {
        type: Number,
        required: true, 
        min: 1
    },
    minutosPorEpisodio: {
        type: Number,
        required: true,
        min: 1
    },  
    categoria: {
        type: mongoose.Schema.Types.ObjectId, ref : "Categoria",
        required: true
    }
});

export default mongoose.model("Serie", serieSchema, "series");
