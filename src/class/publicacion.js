import { text } from "body-parser";

export class Publicacion{

    #id_publicacion;
    #fecha;
    #comentario_publicacion;
    #comentarios;
    #imagenes;
    #id_usuario;
    #id_categoria;
    #id_asentamiento;

    constructor(id_publicacion, fecha, comentario_publicacion, comentarios, imagenes, id_usuario, id_categoria, id_asentamiento){
        this.#id_publicacion = id_publicacion;
        this.#fecha = fecha;
        this.#comentario_publicacion = comentario_publicacion;
        this.#comentarios = comentarios;
        this.#imagenes = imagenes;
        this.#id_usuario = id_usuario;
        this.#id_categoria = id_categoria;
        this.#id_asentamiento = id_asentamiento;
    }

    validarDatos = () => {
        const text = /(\d|\s)+/;

        if (text.test(this.#comentario_publicacion)){
            return true;
        } else {
            return false;
        }
    }

    obtenerIdPublicacion = () => {
        return this.#id_publicacion;
    }

    obtenerFecha = () => {
        return this.#fecha;
    }

    obtenerComentarioDePublicacion = () => {
        return this.#comentario_de_publicacion;
    }

    obtenerComentarios = () => {
        return this.#comentarios;
    }

    obtenerImagenes = () => {
        return this.#imagenes;
    }

    obtenerIdUsuario = () => {
        return this.#id_usuario;
    }

    obtenerIdCategoria = () => {
        return this.#id_categoria;
    }

    obtenerIdAsentamiento = () => {
        return this.#id_asentamiento;
    }

}