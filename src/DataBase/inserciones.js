import { con } from "./conexion.js";

export class Insersiones {
    constructor() {
        this.con = con;
    }

    insertarImagen = (ruta, id_publicacion) => {
        this.con.query('INSERT INTO `mimagen` (`ruta`, `id_publicacion`) VALUES (' + ruta + ', ' + id_publicacion + ');', (error, result) => {
            if (error) {
                console.error(error);
            }
        })
    }

    insertarPublicacion = (comentario, fecha, id_usuario, id_categoria, id_asentamiento) => {
        this.con.query('INSERT INTO `mydb`.`mpublicacion` (`comentario`, `fecha`, `id_usuario`, `id_categoria`, `id_asentamiento` VALUES (' + comentario + ', ' + fecha + ', ' + id_usuario + ', ' + id_categoria + ', ' + id_asentamiento + ');', (error, result) => {
            if (error) {
                console.error(error);
            }
        })
    }

    insertarComentario = (comentario, fecha, id_publicacion, id_usuario) => {
        this.con.query('INSERT INTO `mydb`.`mcomentario` (`comentario`, `fecha`, `id_publicacion`, `id_usuario`) VALUES (' + comentario + ', ' + fecha + ', ' + id_publicacion + ', ' + id_usuario + ');', (error, result) => {
            if (error) {
                console.error(error);
            }
        })
    }
}