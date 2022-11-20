import express from 'express';
import { Consultas } from './src/DataBase/consultas.js';
import { Inserciones } from './src/database/inserciones.js';
import { Persona } from './src/class/persona.js';
import { Usuario } from './src/class/usuario.js';
import { Comentario } from './src/class/comentario.js';
import { Publicacion } from './src/class/publicacion.js';
import { Imagen } from './src/class/imagen.js';
import { Ediciones } from './src/DataBase/ediciones.js';

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
        req.session.id_usuario = usuario.obtenerIdUsuario();

        const publicaciones = await consulta.obtenerTodasLasPublicaciones();
        const publicaciones_cerca = await consulta.obtenerTodasLasPublicacionesPorAsentamiento(usuario.obtenerPersona().obtenerIdAsentamiento());
        const estados = await consulta.obtenerEstados();
        const municipios = await consulta.obtenerMunicipios();
        const asentamientos = await consulta.obtenerTodosLosAentmaientos();

        for (var i = 0; i < publicaciones.length; i++) {
            const imagenes = await consulta.obtenerImagenesDePublicacion(publicaciones[i].obtenerIdPublicacion());
            const comentarios = await consulta.obtenerComentariosDePublicacion(publicaciones[i].obtenerIdPublicacion());
            const usuario = await consulta.obtenerUsuarioPorID(publicaciones[i].obtenerIdUsuario());

            if (comentarios == false) {
                publicaciones[i].inicializarComentarios([]);
            } else {
                for (var j = 0; j < comentarios.length; j++) {
                    const usuario_comentario = await consulta.obtenerUsuarioPorID(comentarios[j].obtenerIdUsuario());

                    comentarios[j].inicializarUsuario(usuario_comentario)
                }
                publicaciones[i].inicializarComentarios(comentarios);

            }

            publicaciones[i].inicializarImagenes(imagenes);
            publicaciones[i].inicializarUsuario(usuario);
        }

        for (var i = 0; i < publicaciones_cerca.length; i++) {
            const imagenes = await consulta.obtenerImagenesDePublicacion(publicaciones_cerca[i].obtenerIdPublicacion());
            const comentarios = await consulta.obtenerComentariosDePublicacion(publicaciones_cerca[i].obtenerIdPublicacion());
            const usuario = await consulta.obtenerUsuarioPorID(publicaciones_cerca[i].obtenerIdUsuario());

            if (comentarios == false) {
                publicaciones_cerca[i].inicializarComentarios([]);
            } else {
                for (var j = 0; j < comentarios.length; j++) {
                    const usuario_comentario = await consulta.obtenerUsuarioPorID(comentarios[j].obtenerIdUsuario());

                    comentarios[j].inicializarUsuario(usuario_comentario)
                }
                publicaciones_cerca[i].inicializarComentarios(comentarios);

            }

            publicaciones_cerca[i].inicializarImagenes(imagenes);
            publicaciones_cerca[i].inicializarUsuario(usuario);
        }

        res.render('home', {
            usuario: usuario,
            publicaciones_cerca: publicaciones_cerca,
            publicaciones: publicaciones,
            estados: estados,
            municipios: municipios,
            asentamientos: asentamientos
        });
    } else {
        res.redirect('/?login=false');
    }
});

router.get('/home', async (req, res) => {
    if (req.session.id_usuario && req.session.id_usuario != null) {

        const consulta = new Consultas();
        const usuario = await consulta.obtenerUsuarioPorID(req.session.id_usuario);

        if (usuario) {
            if (req.query.clave){
                var publicaciones = await consulta.obtenerTodasLasPublicacionesPorPalabraClave(req.query.clave);
            } else {
                var publicaciones = await consulta.obtenerTodasLasPublicaciones();
            }
            const publicaciones_cerca = await consulta.obtenerTodasLasPublicacionesPorAsentamiento(usuario.obtenerPersona().obtenerIdAsentamiento())
            const estados = await consulta.obtenerEstados();
            const municipios = await consulta.obtenerMunicipios();
            const asentamientos = await consulta.obtenerTodosLosAentmaientos();


            for (var i = 0; i < publicaciones.length; i++) {
                const imagenes = await consulta.obtenerImagenesDePublicacion(publicaciones[i].obtenerIdPublicacion());
                const comentarios = await consulta.obtenerComentariosDePublicacion(publicaciones[i].obtenerIdPublicacion());
                const usuario = await consulta.obtenerUsuarioPorID(publicaciones[i].obtenerIdUsuario());

                if (comentarios == false) {
                    publicaciones[i].inicializarComentarios([]);
                } else {
                    for (var j = 0; j < comentarios.length; j++) {
                        const usuario_comentario = await consulta.obtenerUsuarioPorID(comentarios[j].obtenerIdUsuario());

                        comentarios[j].inicializarUsuario(usuario_comentario)
                    }
                    publicaciones[i].inicializarComentarios(comentarios);

                }

                publicaciones[i].inicializarImagenes(imagenes);
                publicaciones[i].inicializarUsuario(usuario);
            }

            for (var i = 0; i < publicaciones_cerca.length; i++) {
                const imagenes = await consulta.obtenerImagenesDePublicacion(publicaciones_cerca[i].obtenerIdPublicacion());
                const comentarios = await consulta.obtenerComentariosDePublicacion(publicaciones_cerca[i].obtenerIdPublicacion());
                const usuario = await consulta.obtenerUsuarioPorID(publicaciones_cerca[i].obtenerIdUsuario());

                if (comentarios == false) {
                    publicaciones_cerca[i].inicializarComentarios([]);
                } else {
                    for (var j = 0; j < comentarios.length; j++) {
                        const usuario_comentario = await consulta.obtenerUsuarioPorID(comentarios[j].obtenerIdUsuario());

                        comentarios[j].inicializarUsuario(usuario_comentario)
                    }
                    publicaciones_cerca[i].inicializarComentarios(comentarios);

                }

                publicaciones_cerca[i].inicializarImagenes(imagenes);
                publicaciones_cerca[i].inicializarUsuario(usuario);
            }

            res.render('home', {
                usuario: usuario,
                publicaciones: publicaciones,
                publicaciones_cerca: publicaciones_cerca,
                estados: estados,
                municipios: municipios,
                asentamientos: asentamientos
            });
        }
    } else {
        res.redirect('/');
    }
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
        res.redirect(`/home`)
    }
})

router.post('/agregar-publicacion', async (req, res) => {
    const insertar = new Inserciones();

    const comentario = req.body.comentario;
    const fecha = new Date();
    const fecha_normalizada = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()} ${fecha.toLocaleTimeString()}`;
    const id_usuario = req.body.id_usuario;
    const id_categoria = req.body.id_categoria;
    const id_asentamiento = req.body.id_asentamiento;
    const ruta = req.body.ruta;

    const publicacion = new Publicacion(0, fecha_normalizada, comentario, [], [], id_usuario, '', id_categoria, '', id_asentamiento);
    const imagen = new Imagen(0, ruta, 0);

    const respuesta = await insertar.insertarPublicacion(publicacion, imagen);
    if (respuesta) {
        res.redirect(`/home`)
    }
})

router.get('/user', async (req, res) => {
    if (req.session.id_usuario && req.session.id_usuario != null) {
        const consulta = new Consultas();
        const id_user = req.session.id_usuario;

        const estados = await consulta.obtenerEstados();
        const municipios = await consulta.obtenerMunicipios();
        const asentamientos = await consulta.obtenerTodosLosAentmaientos();

        const usuario = await consulta.obtenerUsuarioPorID(id_user);

        res.render('PerfilUser', {
            usuario: usuario,
            estados: estados,
            municipios: municipios,
            asentamientos: asentamientos
        })
    } else {
        res.redirect('/')
    }
})

router.get('/cerca-de-ti', async (req, res) => {
    if (req.session.id_usuario && req.session.id_usuario != null) {

        const consulta = new Consultas();
        const usuario = await consulta.obtenerUsuarioPorID(req.session.id_usuario);

        if (usuario) {
            const publicaciones = await consulta.obtenerTodasLasPublicaciones();
            const publicaciones_cerca = await consulta.obtenerTodasLasPublicacionesPorAsentamiento(usuario.obtenerPersona().obtenerIdAsentamiento())
            const estados = await consulta.obtenerEstados();
            const municipios = await consulta.obtenerMunicipios();
            const asentamientos = await consulta.obtenerTodosLosAentmaientos();


            for (var i = 0; i < publicaciones.length; i++) {
                const imagenes = await consulta.obtenerImagenesDePublicacion(publicaciones[i].obtenerIdPublicacion());
                const comentarios = await consulta.obtenerComentariosDePublicacion(publicaciones[i].obtenerIdPublicacion());
                const usuario = await consulta.obtenerUsuarioPorID(publicaciones[i].obtenerIdUsuario());

                if (comentarios == false) {
                    publicaciones[i].inicializarComentarios([]);
                } else {
                    for (var j = 0; j < comentarios.length; j++) {
                        const usuario_comentario = await consulta.obtenerUsuarioPorID(comentarios[j].obtenerIdUsuario());

                        comentarios[j].inicializarUsuario(usuario_comentario)
                    }
                    publicaciones[i].inicializarComentarios(comentarios);

                }

                publicaciones[i].inicializarImagenes(imagenes);
                publicaciones[i].inicializarUsuario(usuario);
            }

            for (var i = 0; i < publicaciones_cerca.length; i++) {
                const imagenes = await consulta.obtenerImagenesDePublicacion(publicaciones_cerca[i].obtenerIdPublicacion());
                const comentarios = await consulta.obtenerComentariosDePublicacion(publicaciones_cerca[i].obtenerIdPublicacion());
                const usuario = await consulta.obtenerUsuarioPorID(publicaciones_cerca[i].obtenerIdUsuario());

                if (comentarios == false) {
                    publicaciones_cerca[i].inicializarComentarios([]);
                } else {
                    for (var j = 0; j < comentarios.length; j++) {
                        const usuario_comentario = await consulta.obtenerUsuarioPorID(comentarios[j].obtenerIdUsuario());

                        comentarios[j].inicializarUsuario(usuario_comentario)
                    }
                    publicaciones_cerca[i].inicializarComentarios(comentarios);

                }

                publicaciones_cerca[i].inicializarImagenes(imagenes);
                publicaciones_cerca[i].inicializarUsuario(usuario);
            }

            res.render('cercaDeTi', {
                usuario: usuario,
                publicaciones: publicaciones,
                publicaciones_cerca: publicaciones_cerca,
                estados: estados,
                municipios: municipios,
                asentamientos: asentamientos
            });
        }
    } else {
        res.redirect('/');
    }
})

router.get('/mis_publicaciones', async (req, res) => {
    if (req.session.id_usuario && req.session.id_usuario != null) {

        const consulta = new Consultas();
        const usuario = await consulta.obtenerUsuarioPorID(req.session.id_usuario);

        if (usuario) {
            const publicaciones = await consulta.obtenerTodasLasPublicaciones();
            const mis_publicaciones = await consulta.obtenerTodasLasPublicacionesPorUsuario(usuario.obtenerIdUsuario())
            const estados = await consulta.obtenerEstados();
            const municipios = await consulta.obtenerMunicipios();
            const asentamientos = await consulta.obtenerTodosLosAentmaientos();


            for (var i = 0; i < publicaciones.length; i++) {
                const imagenes = await consulta.obtenerImagenesDePublicacion(publicaciones[i].obtenerIdPublicacion());
                const comentarios = await consulta.obtenerComentariosDePublicacion(publicaciones[i].obtenerIdPublicacion());
                const usuario = await consulta.obtenerUsuarioPorID(publicaciones[i].obtenerIdUsuario());

                if (comentarios == false) {
                    publicaciones[i].inicializarComentarios([]);
                } else {
                    for (var j = 0; j < comentarios.length; j++) {
                        const usuario_comentario = await consulta.obtenerUsuarioPorID(comentarios[j].obtenerIdUsuario());

                        comentarios[j].inicializarUsuario(usuario_comentario)
                    }
                    publicaciones[i].inicializarComentarios(comentarios);

                }

                publicaciones[i].inicializarImagenes(imagenes);
                publicaciones[i].inicializarUsuario(usuario);
            }

            for (var i = 0; i < mis_publicaciones.length; i++) {
                const imagenes = await consulta.obtenerImagenesDePublicacion(mis_publicaciones[i].obtenerIdPublicacion());
                const comentarios = await consulta.obtenerComentariosDePublicacion(mis_publicaciones[i].obtenerIdPublicacion());
                const usuario = await consulta.obtenerUsuarioPorID(mis_publicaciones[i].obtenerIdUsuario());

                if (comentarios == false) {
                    mis_publicaciones[i].inicializarComentarios([]);
                } else {
                    for (var j = 0; j < comentarios.length; j++) {
                        const usuario_comentario = await consulta.obtenerUsuarioPorID(comentarios[j].obtenerIdUsuario());

                        comentarios[j].inicializarUsuario(usuario_comentario)
                    }
                    mis_publicaciones[i].inicializarComentarios(comentarios);

                }

                mis_publicaciones[i].inicializarImagenes(imagenes);
                mis_publicaciones[i].inicializarUsuario(usuario);
            }

            res.render('misPublicaciones', {
                usuario: usuario,
                publicaciones: publicaciones,
                mis_publicaciones: mis_publicaciones,
                estados: estados,
                municipios: municipios,
                asentamientos: asentamientos
            });
        }
    } else {
        res.redirect('/');
    }
})

router.get('/editar-perfil', async (req, res) => {
    if (req.session.id_usuario && req.session.id_usuario != null) {
        const consulta = new Consultas();

        const estados = await consulta.obtenerEstados();
        const municipios = await consulta.obtenerMunicipios();
        const asentamientos = await consulta.obtenerTodosLosAentmaientos();

        if (!req.query.sigIn && !req.query.error) {
            const nuevoIntento = false;
            const error = false;
            res.render('EditarPerfil', {
                nuevoIntento: nuevoIntento,
                error: error,
                id_usuario: req.session.id_usuario,
                estados: estados,
                municipios: municipios,
                asentamientos: asentamientos
            });
        } else if (req.query.sigIn) {
            const nuevoIntento = true;
            const error = false;
            res.render('EditarPerfil', {
                nuevoIntento: nuevoIntento,
                error: error,
                id_usuario: req.session.id_usuario,
                estados: estados,
                municipios: municipios,
                asentamientos: asentamientos
            });

        } else if (req.query.error) {
            const nuevoIntento = false;
            const error = true;
            res.render('EditarPerfil', {
                nuevoIntento: nuevoIntento,
                error: error,
                id_usuario: req.session.id_usuario,
                estados: estados,
                municipios: municipios,
                asentamientos: asentamientos
            });
        }
    } else {
        res.redirect('/');
    }
})

router.post('/editar-perfil', async (req, res) => {
    if (req.session.id_usuario && req.session.id_usuario != null) {
        const consulta = new Consultas();
        const edicion = new Ediciones();

        const persona = new Persona(0, req.body.nombre, req.body.appat, req.body.apmat, req.body.fecha, req.body.sexo, '', req.body.asentamiento);
        const usuario = new Usuario(0, req.body.correo, req.body.contrasenia, 0, persona, 1, '');

        const existe = await consulta.obtenerUsuarioPorCorreo(usuario.obtenerCorreo())

        if (!existe) {
            const respuesta = await edicion.editarPersonYUsuario(req.session.id_usuario, persona, usuario);
            if (respuesta) {
                res.redirect('/');
            } else {
                res.redirect('/editar-perfil?error=false');
            }
        } else {
            res.redirect('/editar-perfil?sigIn=false');
        }
    } else {
        res.redirect('/')
    }
})