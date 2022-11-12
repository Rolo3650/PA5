import { Estado } from "../class/estado.js";
import { Persona } from "../class/persona.js";
import { Municipio } from "../class/municipio.js";
import { con } from "./conexion.js";
import { Publicacion } from "../class/publicacion.js";
import { Comentario } from "../class/comentario.js";
import { Asentamiento } from "../class/asentamiento.js";
import { Imagen } from "../class/imagen.js";
import { Usuario } from "../class/usuario.js";

export class Consultas {

    #con;

    constructor() {
        this.#con = con;
    }

    obtenerComentariosDePublicacion = (id_publicacion) => {
        const promesa = new Promise((resolve) => {
            this.#con.query('Select * from mcomentario where id_publicacion = ' + id_publicacion + ';', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    if (result[0]){
                        let comentarios = result.map(datos => {
                            let comentario = new Comentario(datos.id_comentario, datos.comentario, datos.fecha, datos.id_publicacion, datos.id_usuario)
    
                            return comentario;
                        })
    
                        resolve(comentarios);
                    } else {
                        resolve(false);
                    }
                }
            })
        });
        return promesa;
    }

    obtenerEstados = () => {
        const promesa = new Promise((resolve) => {
            this.#con.query('Select * from cestado;', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let estados = result.map(datos => {
                        let estado = new Estado(datos.id_estado, datos.estado)
                        return estado
                    })
                    resolve(estados);
                }
            })
        });
        return promesa;
    }

    obtenerMunicipios = () => {
        const promesa = new Promise((resolve) => {
            this.#con.query('Select * from cmunicipio;', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let municipios = result.map(datos => {
                        let municipio = new Municipio(datos.id_municipio, datos.municipio)
                        return municipio
                    })
                    resolve(municipios);
                }
            })
        });
        return promesa;
    }

    obtenerAsentamiento = (id_asentamiento) => {
        const promesa = new Promise((resolve) => {
            this.#con.query('Select * from masentamiento natural join czona natural join cestado natural join cmunicipio natrual join ctipo_asetamiento where id_asentamiento = ' + id_asentamiento + ';', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let estado = new Estado(result[0].id_estado, result[0].estado);
                    let municipio = new Municipio(result[0].id_municipio, result[0].municipio);

                    let asentamiento = new Asentamiento(estado, municipio, result[0].cp, result[0].id_asentamiento, result[0].codigo_asentamiento, result[0].asentamiento, result[0].id_tipo, result[0].tipo)
                    resolve(asentamiento);
                }
            })
        });
        return promesa;
    }

    obtenerTodosLosAentmaientos = () => {
        const promesa = new Promise((resolve) => {
            this.#con.query('Select * from masentamiento natural join czona natural join cestado natural join cmunicipio;', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let asentamientos = result.map(data => {
                        let estado = new Estado(data.id_estado, data.estado);
                        let municipio = new Municipio(data.id_municipio, data.municipio);

                        let asentamiento = new Asentamiento(estado, municipio, data.cp, data.id_asentamiento, data.codigo_asentamiento, data.asentamiento, data.id_tipo, data.tipo)

                        return asentamiento;
                    })

                    resolve(asentamientos);
                }
            })
        });
        return promesa;
    }

    obtenerImagenesDePublicacion = (id_publicacion) => {
        const promesa = new Promise((resolve) => {
            this.#con.query('Select * from mimagen where id_publicacion = ' + id_publicacion + ';', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let imagenes = result.map(data => {
                        let imagen = new Imagen(data.id_imagen, data.ruta, data.id_publicacion);

                        return imagen;
                    })

                    resolve(imagenes);
                }
            })
        });
        return promesa;
    }

    obtenerTiposDeCategorias = () => {
        const promesa = new Promise((resolve) => {
            this.#con.query('Select * from ccategoria_publicacion;', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    resolve(result);
                }
            })
        });
        return promesa;
    }

    obtenerTodasLasPersonas = () => {
        const promesa = new Promise((resolve) => {
            this.#con.query('Select * from mpersona natural join csexo;', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let personas = result.map(datos => {
                        let persona = new Persona(datos.id_persona, datos.nombre, datos.appat, datos.apmat, datos.fecha_nacimiento, datos.id_sexo, datos.sexo, datos.id_asentamiento);
                        return persona;
                    })

                    resolve(personas);
                }
            })
        });
        return promesa;
    }

    obtenerPersona = (id_persona) => {
        const promesa = new Promise((resolve) => {
            this.#con.query(`Select * from mpersona natural join csexo where id_persona = ${id_persona} ;`, (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let persona = new Persona(result[0].id_persona, result[0].nombre, result[0].appat, result[0].apmat, result[0].fecha_nacimiento, result[0].id_sexo, result[0].sexo, result[0].id_asentamiento);

                    resolve(persona);
                }
            })
        });
        return promesa;
    }

    obtenerUltimaPersona = () => {
        const promesa = new Promise((resolve) => {
            this.#con.query(`Select * from mpersona natural join csexo order by id_persona desc;`, (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let persona = new Persona(result[result.length - 1].id_persona, result[result.length - 1].nombre, result[result.length - 1].appat, result[result.length - 1].apmat, result[result.length - 1].fecha_nacimiento, result[result.length - 1].id_sexo, result[result.length - 1].sexo, result[result.length - 1].id_asentamiento);

                    resolve(persona);
                }
            })
        });
        return promesa;
    }

    obtenerUltimaPublicacion = () => {
        const promesa = new Promise((resolve) => {
            this.#con.query(`Select * from mpublicacion;`, (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let publicacion = new Publicacion(result[result.length-1].id_publicacion, '', '', '', '', '', '', '', '', '');

                    resolve(publicacion);
                }
            })
        });
        return promesa;
    }

    obtenerTodosLosUsuarios = () => {
        const promesa = new Promise((resolve) => {
            this.#con.query('Select * from musuario natural join mpersona natural join csexo;', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let usuarios = result.map(datos => {
                        let persona = new Persona(datos.id_persona, datos.nombre, datos.appat, datos.apmat, datos.fecha_nacimiento, datos.id_sexo, datos.sexo, datos.id_asentamiento);

                        let usuario = new Usuario(datos.id_usuario, datos.correo, datos.constrasenia, datos.id_persona, persona, datos.id_tipo, datos.tipo);

                        return usuario;
                    })

                    resolve(usuarios);
                }
            })
        });
        return promesa;
    }

    obtenerUsuarioPorLogin = (correo, contrasenia) => {
        const promesa = new Promise((resolve) => {
            this.#con.query(`Select * from musuario natural join mpersona natural join csexo natural join ctipo_usuario where correo = '${correo}' and contrasenia = '${contrasenia}';`, (error, result) => {
                if (error) {
                    console.error(error);
                } else {

                    if (result[0]) {
                        let persona = new Persona(result[0].id_persona, result[0].nombre, result[0].appat, result[0].apmat, result[0].fecha_nacimiento, result[0].id_sexo, result[0].sexo, result[0].id_asentamiento);
                        let usuario = new Usuario(result[0].id_usuario, result[0].correo, result[0].constrasenia, result[0].id_persona, persona, result[0].id_tipo, result[0].tipo_usuario);

                        resolve(usuario);
                    } else {
                        resolve(false)
                    }

                }
            })
        });
        return promesa;
    }

    obtenerUsuarioPorCorreo = (correo) => {
        const promesa = new Promise((resolve) => {
            this.#con.query(`Select * from musuario natural join mpersona natural join csexo natural join ctipo_usuario where correo = '${correo}';`, (error, result) => {
                if (error) {
                    console.error(error);
                } else {

                    if (result[0]) {
                        resolve(true);
                    } else {
                        resolve(false)
                    }

                }
            })
        });
        return promesa;
    }

    obtenerUsuarioPorID = (id_usuario) => {
        const promesa = new Promise((resolve) => {
            this.#con.query(`Select * from musuario natural join mpersona natural join csexo natural join ctipo_usuario where id_usuario = ${id_usuario}`, (error, result) => {
                if (error) {
                    console.error(error);
                } else {

                    let persona = new Persona(result[0].id_persona, result[0].nombre, result[0].appat, result[0].apmat, result[0].fecha_nacimiento, result[0].id_sexo, result[0].sexo, result[0].id_asentamiento);

                    let usuario = new Usuario(result[0].id_usuario, result[0].correo, result[0].contrasenia, result[0].id_persona, persona, result[0].id_tipo, result[0].tipo_usuario);

                    resolve(usuario);
                }
            })
        });
        return promesa;
    }

    obtenerTodasLasPublicaciones = () => {
        const promesa = new Promise((resolve) => {
            this.#con.query('Select * from mpublicacion natural join ccategoria_publicacion', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let publicaciones = result.map(datos => {
                        let publicacion = new Publicacion(datos.id_publicacion, datos.fecha, datos.comentario, [], [], datos.id_usuario, datos.id_categoria, datos.categoria, datos.id_asentamiento)
                        return publicacion;
                    })
                    resolve(publicaciones);
                }
            })
        });
        return promesa;
    }

    obtenerTodasLasPublicacionesPorUsuario = (id_usuario) => {
        const promesa = new Promise((resolve) => {
            this.#con.query(`Select * from mpublicacion natural join ccategoria_publicacion where id_usuario = ${id_usuario};`, (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let publicaciones = result.map(async datos => {

                        let publicacion = new Publicacion(datos.id_publicacion, datos.id_fecha, datos.comentario, [], [], datos.id_usuario, datos.id_categoria, datos.categoria, datos.id_asentamiento)

                        return publicacion;
                    })

                    resolve(publicaciones);
                }
            })
        });
        return promesa;
    }

    obtenerPublicacion = id_publicacion => {
        const promesa = new Promise((resolve) => {
            this.#con.query(`Select * from mpublicacion natural join ccategoria_publicacion where id_publicacion = ${id_publicacion};`, (error, result) => {
                if (error) {
                    console.error(error);
                } else {

                    let publicacion = new Publicacion(result[0].id_publicacion, result[0].id_fecha, result[0].comentario, [], [], result[0].id_usuario, result[0].id_categoria, result[0].categoria, result[0].id_asentamiento)

                    resolve(publicacion);
                }
            })
        });
        return promesa;
    }

}