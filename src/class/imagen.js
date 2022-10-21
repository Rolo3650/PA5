export class Imagen {

    #id_imagen;
    #ruta;
    #id_publicacion;

    constructor(id_imagen, ruta, id_publicacion) {
        this.#id_imagen = id_imagen;
        this.#ruta = ruta;
        this.#id_publicacion = id_publicacion;
    }

    validarDatos = () => {
        const ruta = /^\w+$/;

        if (ruta.test(this.#ruta)) {
            return true;
        } else {
            return false;
        }
    }

    obtenerIdImagen = () => {
        return this.#id_imagen
    }

    obtenerRuta = () => {
        return this.#ruta;
    }

    obtenerIdPublicacion = () => {
        return this.#id_publicacion;
    }

}