import mongoose from "mongoose";
import Categoria from "./categoria.model.js";

const peliculaSchema = new mongoose.Schema({

  titulo: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
  },
  plataforma: {
    type: String,
    required: true,
  },
  duracionMinutos: {
    type: Number,
    required: true,
    min: 1
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId, ref: "Categoria",
    required: true
  }
});

export default mongoose.model("Pelicula", peliculaSchema, "peliculas");