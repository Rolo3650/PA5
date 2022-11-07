import express from 'express';
import { Consultas } from './src/database/consultas.js';
import { Inserciones } from './src/database/inserciones.js';
import { Persona } from './src/class/persona.js';
import { Usuario } from './src/class/usuario.js';
import { Comentario } from './src/class/comentario.js';

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
        const publicaciones = await consulta.obtenerTodasLasPublicaciones();
        const estados = await consulta.obtenerEstados();
        const municipios = await consulta.obtenerMunicipios();
        const asentamientos = await consulta.obtenerTodosLosAentmaientos();


        for (var i = 0; i < publicaciones.length; i++) {
            const imagenes = await consulta.obtenerImagenesDePublicacion(publicaciones[i].obtenerIdPublicacion());
            const comentarios = await consulta.obtenerComentariosDePublicacion(publicaciones[i].obtenerIdPublicacion());
            const usuario = await consulta.obtenerUsuarioPorID(publicaciones[i].obtenerIdUsuario());

            for (var j = 0; j < comentarios.length; j++) {
                const usuario_comentario = await consulta.obtenerUsuarioPorID(comentarios[j].obtenerIdUsuario());

                comentarios[j].inicializarUsuario(usuario_comentario)
            }

            publicaciones[i].inicializarImagenes(imagenes);
            publicaciones[i].inicializarComentarios(comentarios);
            publicaciones[i].inicializarUsuario(usuario);
        }

        res.render('home', {
            usuario: usuario,
            publicaciones: publicaciones,
            estados: estados,
            municipios: municipios,
            asentamientos: asentamientos
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

router.get('/registrarse', async (req, res) => {
    const consulta = new Consultas();

    const estados = await consulta.obtenerEstados();
    const municipios = await consulta.obtenerMunicipios();
    const asentamientos = await consulta.obtenerTodosLosAentmaientos();

    if (!req.query.sigIn && !req.query.error) {
        const nuevoIntento = false;
        const error = false;
        res.render('registrarse', {
            nuevoIntento: nuevoIntento,
            error: error,
            estados: estados,
            municipios: municipios,
            asentamientos: asentamientos
        });
    } else if (req.query.sigIn) {
        const nuevoIntento = true;
        const error = false;
        res.render('registrarse', {
            nuevoIntento: nuevoIntento,
            error: error,
            estados: estados,
            municipios: municipios,
            asentamientos: asentamientos
        });

    } else if (req.query.error) {
        const nuevoIntento = false;
        const error = true;
        res.render('registrarse', {
            nuevoIntento: nuevoIntento,
            error: error,
            estados: estados,
            municipios: municipios,
            asentamientos: asentamientos
        });
    }
})

router.post('/registrarse', async (req, res) => {
    const consulta = new Consultas();
    const inserciones = new Inserciones();

    const persona = new Persona(0, req.body.nombre, req.body.appat, req.body.apmat, req.body.fecha, req.body.sexo, '', req.body.asentamiento);
    const usuario = new Usuario(0, req.body.correo, req.body.contrasenia, 0, persona, 1, '');

    const existe = await consulta.obtenerUsuarioPorCorreo(usuario.obtenerCorreo())

    if (!existe) {
        const respuesta = await inserciones.insertarPersonaYUsuario(persona, usuario);
        if (respuesta) {
            res.redirect('/');
        } else {
            res.redirect('/registrarse?error=false');
        }
    } else {
        res.redirect('/registrarse?sigIn=false');
    }

})

router.post('/agregar-comentario', async (req, res) => {
    const insersion = new Inserciones();
    const consulta = new Consultas();
    const fecha = new Date();
    const fecha_normalizada = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()} ${fecha.toLocaleTimeString()}`;

    const comentario = new Comentario(0, req.body.comentario, fecha_normalizada, req.body.id_publicacion, req.body.id_usuario)
    const usuario = await consulta.obtenerUsuarioPorID(req.body.id_usuario);
    const response = await insersion.insertarComentario(comentario);

    if (response) {
        res.redirect(307, '/home');
    }
})