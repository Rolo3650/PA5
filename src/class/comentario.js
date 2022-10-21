export class Comentario {

    #id_comentario;
    #comentario;
    #fecha;
    #id_publicacion;
    #id_usuario;

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

}