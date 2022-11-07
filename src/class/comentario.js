export class Comentario {

    #id_comentario;
    #comentario;
    #fecha;
    #id_publicacion;
    #id_usuario;
    #usuario;

    constructor(id_comentario, comentario, fecha, id_publicacion, id_usuario) {
        this.#id_comentario = id_comentario;
        this.#comentario = comentario;
        this.#fecha = fecha;
        this.#id_publicacion = id_publicacion;
        this.#id_usuario = id_usuario;
    }

    validarDatos = () => {
        const text = /^(\d|\s)+$/;

        if (text.test(this.#id_comentario)){
            return true;
        } else {
            return false;
        }
    }

    inicializarUsuario = usuario => {
        this.#usuario = usuario;
    }

    obtenerIdComentarios = () => {
        return this.#id_comentario;
    }

    obtenerComentario = () => {
        return this.#comentario;
    }

    obtenerFecha = () => {
        return this.#fecha;
    }

    obtenerIdPublicacion = () => {
        return this.#id_publicacion;
    }

    obtenerIdUsuario = () => {
        return this.#id_usuario;
    }

    obtenerUsuario = () => {
        return this.#usuario;
    }

}
