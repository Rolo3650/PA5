import express from 'express';
import { Consultas } from './src/database/consultas.js';
import { Inserciones } from './src/database/inserciones.js';
import { Publicacion } from './src/class/publicacion.js';
import { Persona } from './src/class/persona.js';
import { Usuario } from './src/class/usuario.js';

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