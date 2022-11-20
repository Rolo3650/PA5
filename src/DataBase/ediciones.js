import { con } from "./conexion.js";
import { Consultas } from "./consultas.js";

export class Ediciones {

    #con;
    #consultas;

    constructor() {
        this.#con = con;
        this.#consultas = new Consultas();
    }

    editarPersonYUsuario = async (id_usuario, persona, usuario) => {
        let id_persona = id_usuario;

        const promesa = new Promise((resolve) => {
            this.#con.query("UPDATE `mpersona` SET `nombre` = '"+persona.obtenerNombre()+"', `appat` = '"+persona.obtenerAppat()+"', `apmat` = '"+persona.obtenerApmat()+"', `fecha_nacimiento` = '"+persona.obtenerFechaNacimiento()+"', `id_sexo` = '"+persona.obtenerIdSexo()+"', `id_asentamiento` = '"+persona.obtenerIdAsentamiento()+"' WHERE (`id_persona` = '"+id_usuario+"');", (error, result) => {
                if (error) {
                    resolve(false);
                } else {
                }
            })
            this.#con.query("UPDATE `musuario` SET `correo` = '"+usuario.obtenerCorreo()+"', `contrasenia` = '"+usuario.obtenerContrasenia()+"' WHERE (`id_usuario` = '"+id_usuario+"') and (`id_persona` = '"+id_usuario+"');", (error, result) => {
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