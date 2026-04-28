import axios from "axios";
import Seguimiento from "../models/seguimiento.model.js";
import { useGemini25Flash } from "./gemini.services.js";


export const obtenerSeguimientosService = async () =>{
    const seguimientos = await Seguimiento.find();
    return seguimientos;
}

export const obtenerSeguimientoPorIdService = async (id, idUsuarioLogueado) =>{
    const seguimiento = await Seguimiento.findById(id);
    console.log("ID del dueño del seguimiento:", seguimiento.usuario.toString());
    console.log("ID del usuario logueado:", idUsuarioLogueado.toString());
    console.log("Son iguales:", seguimiento.usuario.toString() === idUsuarioLogueado.toString());
    if (!seguimiento) {
        const error = new Error("Seguimiento no encontrado");
        error.statusCode = 404;
        throw error;
    }
    if (seguimiento.usuario.toString() !== idUsuarioLogueado.toString()) {
        const error = new Error("No tienes permiso para acceder a este seguimiento");
        error.statusCode = 403;
        throw error;
    }
    return seguimiento;
}

export const crearSeguimientoService = async (seguimientoData) =>{
    const cantidadSeguimientos = await Seguimiento.countDocuments({
    usuario: seguimientoData.usuario
});
    if (cantidadSeguimientos >= 4) {
        const error = new Error("Has alcanzado el límite de 4 seguimientos. Elimina algunos para agregar nuevos.");
        error.status = 400;
        throw error;
    }
    const nuevoSeguimiento = new Seguimiento(seguimientoData);
    await nuevoSeguimiento.save();
    return nuevoSeguimiento;
}

export const actualizarSeguimientoService = async (id, seguimientoData) =>{
    const seguimientoActualizado = await Seguimiento.findByIdAndUpdate(id, seguimientoData, { returnDocument: "after" });
    return seguimientoActualizado;
}

export const eliminarSeguimientoService = async (id) =>{
    const seguimientoEliminado = await Seguimiento.findByIdAndDelete(id);
    return seguimientoEliminado;
}

export const generarRecomendacionesService = async (id) => {
    const seguimientos = await Seguimiento.find({ usuario: id }).populate("serie");

    if (!seguimientos || seguimientos.length === 0) {
        const error = new Error("No se encontraron seguimientos para generar recomendaciones");
        error.status = 404;
        throw error;
    }

    const seriesVistas = seguimientos.map(seg => seg.serie?.titulo).filter(Boolean);

    const textoPrompt = `Recomienda 5 series basado en las siguientes series: ${seriesVistas.join(", ")}. Asegurate de separarlas por punto y comas y de no incluir nada mas que el nombre de la serie. Si no hay suficientes series, completa con recomendaciones generales.`;
    const recomendacionesTexto = await useGemini25Flash(textoPrompt);
    const nombresRecomendados = separarSeriesPorPuntoYComa(recomendacionesTexto);

    if (nombresRecomendados.length === 0) {
        return [];
    }

    const seriesRecomendadas = await buscarSeriesEnTvMaze(nombresRecomendados);

    return seriesRecomendadas.length > 0 ? seriesRecomendadas : nombresRecomendados.map(nombre => ({ titulo: nombre }));
}

export const separarSeriesPorPuntoYComa = (textoGemini) => {
    if (!textoGemini || typeof textoGemini !== 'string') {
        return [];
    }

    return textoGemini.split(";").map(nombre => nombre.trim()).filter(nombre => nombre.length > 0);
};



export const buscarSerieEnTvMaze = async (nombreSerie) => {
    const response = await axios.get("https://api.tvmaze.com/search/shows", {
        params: {
            q: nombreSerie
        }
    });

    const primerResultado = response.data[0];

    if (!primerResultado) {
        return null;
    }

    const show = primerResultado.show;

    return {
        id: show.id,
        titulo: show.name,
        generos: show.genres,
        idioma: show.language,
        estado: show.status,
        estreno: show.premiered,
        rating: show.rating?.average,
        imagen: show.image?.medium,
        resumen: show.summary
    };
};

export const buscarSeriesEnTvMaze = async (nombresSeries) => {
    const resultados = await Promise.all(
        nombresSeries.map(nombre => buscarSerieEnTvMaze(nombre))
    );

    return resultados.filter(Boolean);
};

export const obtenerSeriesMasVistasService = async () => {
    const response = await axios.get("https://api.tvmaze.com/shows");

    return response.data
        .filter(show => show.rating?.average)
        .sort((a, b) => b.rating.average - a.rating.average)
        .slice(0, 10)
        .map(show => ({
            id: show.id,
            titulo: show.name,
            generos: show.genres,
            idioma: show.language,
            estado: show.status,
            estreno: show.premiered,
            rating: show.rating?.average,
            imagen: show.image?.medium,
            resumen: show.summary
        }));
};
