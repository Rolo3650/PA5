import express from 'express';
import { Consultas } from './src/database/consultas.js';
import { Publicacion } from './src/class/publicacion.js';

export const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.query.login) {
        const nuevoIntento = false;
        res.render('login', { nuevoIntento: nuevoIntento });
    } else {
        const nuevoIntento = true;
        res.render('login', { nuevoIntento: nuevoIntento });
    }
})

router.post('/home', async (req, res) => {
    const consulta = new Consultas();
    const correo = req.body.correo;
    const contrasenia = req.body.contrasenia;
    const usuario = await consulta.obtenerUsuarioPorLogin(correo, contrasenia);

    if (usuario) {
        let publicaciones = await consulta.obtenerTodasLasPublicaciones();
        publicaciones.forEach(async publicacion => {
            publicacion.inicializarComentarios(await consulta.obtenerComentariosDePublicacion(publicacion.obtenerIdPublicacion()));
            publicacion.inicializarImagenes( await consulta.obtenerImagenesDePublicacion(publicacion.obtenerIdPublicacion()));
        });

        res.render('home', {
            usuario: usuario,
            publicaciones: publicaciones
        });
    } else {
        res.redirect('/?login=false');
    }
});

router.post('/consultar-perfil', async (req, res) => {
    const consulta = new Consultas();
    const id_usuario = req.body.id_usuario;
    const usuario = await consulta.obtenerUsuarioPorID(id_usuario);

    res.render('consultarPerfil', { usuario: usuario })
});

router.get('/registrarse', (req, res) => {
    res.render('registrarse')
})