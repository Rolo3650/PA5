import express from 'express';
import { obtenerComentariosDePublicacion, obtenerEstados, obtenerImagenesDePublicacion, obtenerMunicipios, obtenerTiposDeCategorias, obtenerTodasLasPublicaciones, obtenerTodasLasZonas, obtenerZona } from './src/database/consultas.js';

export const router = express.Router();

router.get('/home', async (req, res) => {
    const categorias_publicacion = await obtenerTiposDeCategorias();
    const estados = await obtenerEstados();
    const municipios = await obtenerMunicipios();
    const zonas = await obtenerTodasLasZonas();
    
    res.render('home', {
        categorias_publicacion: categorias_publicacion,
        estados: estados,
        municipios: municipios,
        zonas : zonas
    });
    
});