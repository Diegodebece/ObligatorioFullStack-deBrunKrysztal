import mongoose from "mongoose";
import Usuario from "./usuario.model.js";
import Serie from "./serie.model.js";


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
    episodioActual: {
        type: Number,
        min: 0,
        max: 9999,
        default: null
    },
    temporadaActual: {
        type: Number,
        min: 0,
        max: 9999,
        default: null
    },
    fechaInicio: {
        type: Date,
        default: null
    },
    fechaFin: {
        type: Date,
        default: null
    },
  
});

seguimientoSchema.index({ usuario: 1, serie: 1 }, { unique: true });

export default mongoose.model("Seguimiento", seguimientoSchema, "seguimientos");