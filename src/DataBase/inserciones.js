import { con } from "./conexion.js";
import { Consultas } from "./consultas.js";

export class Inserciones {

    #con;
    #consultas;

    constructor() {
        this.#con = con;
        this.#consultas = new Consultas();
    }

    insertarPersonaYUsuario = async (persona, usuario) => {
        let ultimaPersona = await this.#consultas.obtenerUltimaPersona();
        let id_persona = ultimaPersona.obtenerIdPersona() + 1;

        const promesa = new Promise((resolve) => {
            this.#con.query("INSERT INTO `mpersona` (`id_persona`, `nombre`, `appat`, `apmat`, `fecha_nacimiento`, `id_sexo`, `id_asentamiento`) VALUES ('"+id_persona+"', '"+persona.obtenerNombre()+"', '"+persona.obtenerAppat()+"', '"+persona.obtenerApmat()+"', '"+persona.obtenerFechaNacimiento()+"', '"+persona.obtenerIdSexo()+"', '"+persona.obtenerIdAsentamiento()+"');", (error, result) => {
                if (error) {
                    resolve(false);
                } else {
                }
            })
            this.#con.query("INSERT INTO `musuario` (`id_usuario`, `correo`, `contrasenia`, `id_persona`, `id_tipo`) VALUES ('"+id_persona+"', '"+usuario.obtenerCorreo()+"', '"+usuario.obtenerContrasenia()+"', '"+id_persona+"', '1');", (error, result) => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
        });
        return promesa;
    }

    insertarComentario = async (comentario) => {
        const promesa = new Promise((resolve) => {
            this.#con.query("INSERT INTO `mcomentario` (`comentario`, `fecha`, `id_publicacion`, `id_usuario`) VALUES ('"+comentario.obtenerComentario()+"', '"+comentario.obtenerFecha()+"', '"+comentario.obtenerIdPublicacion()+"', '"+comentario.obtenerIdUsuario()+"');", (error, result) => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
        });
        return promesa;
    }

}