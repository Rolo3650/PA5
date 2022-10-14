import { con } from "./conexion.js";

export const insertarImagen = (ruta, id_publicacion) => {
    con.query('INSERT INTO `mimagen` (`ruta`, `id_publicacion`) VALUES (' + ruta + ', ' + id_publicacion + ');', (error, result) => {
        if (error) {
            console.error(error);
        }
    })
}

export const insertarPublicacion = (comentario, fecha, id_usuario, id_categoria, id_asentamiento) => {
    con.query('INSERT INTO `mydb`.`mpublicacion` (`comentario`, `fecha`, `id_usuario`, `id_categoria`, `id_asentamiento` VALUES ('+comentario+', '+fecha+', '+id_usuario+', '+id_categoria+', '+id_asentamiento+');', (error, result) => {
        if (error) {
            console.error(error);
        }
    })
}

export const insertarComentario = (comentario, fecha, id_publicacion, id_usuario) => {
    con.query('INSERT INTO `mydb`.`mcomentario` (`comentario`, `fecha`, `id_publicacion`, `id_usuario`) VALUES ('+comentario+', '+fecha+', '+id_publicacion+', '+id_usuario+');', (error, result) => {
        if (error) {
            console.error(error);
        }
    })
}