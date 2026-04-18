import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
    },
    activa: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Categoria", categoriaSchema, "categorias");