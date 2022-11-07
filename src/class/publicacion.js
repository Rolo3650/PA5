export class Publicacion {

    #id_publicacion;
    #fecha;
    #comentario_publicacion;
    #comentarios;
    #imagenes;
    #id_usuario;
    #usuario;
    #id_categoria;
    #categoria;
    #id_asentamiento;

    constructor(id_publicacion, fecha, comentario_publicacion, comentarios, imagenes, id_usuario, usuario, id_categoria, categoria, id_asentamiento) {
        this.#id_publicacion = id_publicacion;
        this.#fecha = fecha;
        this.#comentario_publicacion = comentario_publicacion;
        this.#comentarios = comentarios;
        this.#imagenes = imagenes;
        this.#id_usuario = id_usuario;
        this.#usuario = usuario;
        this.#id_categoria = id_categoria;
        this.#categoria = categoria;
        this.#id_asentamiento = id_asentamiento;
    }

    validarDatos = () => {
        const text = /(\d|\s)+/;

        if (text.test(this.#comentario_publicacion)) {
            return true;
        } else {
            return false;
        }
    }

    inicializarComentarios = comentarios => {
        this.#comentarios = comentarios;
    }

    inicializarImagenes = imagenes => {
        this.#imagenes = imagenes;
    }

    inicializarUsuario = usuario => {
        this.#usuario = usuario;
    }

    obtenerIdPublicacion = () => {
        return this.#id_publicacion;
    }

    obtenerFecha = () => {
        return this.#fecha;
    }

    obtenerComentarioDePublicacion = () => {
        return this.#comentario_publicacion;
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

    obtenerUsuario= () => {
        return this.#usuario;
    }

    obtenerIdCategoria = () => {
        return this.#id_categoria;
    }

    obtenerCategoria = () => {
        return this.#categoria;
    }

    obtenerIdAsentamiento = () => {
        return this.#id_asentamiento;
    }

}