import mongoose from "mongoose";
import Usuario from "./usuario.model.js";
import Serie from "./serie.model.js";
import Pelicula from "./pelicula.model.js";


const seguimientoSchema = new mongoose.Schema({

    estado: {
        type: String,
        required: true,
        enum: ["pendiente", "viendo", "terminada"], 
        default: "pendiente"
    },  
    esFavorita: {
        type: Boolean, 
        default: false
    },
    ratingPersonal: {
        type: Number,
        min: 1,
        max: 10,
        default: null
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId, ref : "Usuario",
        required: true
    },
    serie: {
        type: mongoose.Schema.Types.ObjectId, ref : "Serie",
        required: true
    },
    pelicula: {
        type: mongoose.Schema.Types.ObjectId, ref : "Pelicula",
        required: true
    }
});

seguimientoSchema.index({ usuario: 1, serie: 1 }, { unique: true });
seguimientoSchema.index({ usuario: 1, pelicula: 1 }, { unique: true });

export default mongoose.model("Seguimiento", seguimientoSchema, "seguimientos");