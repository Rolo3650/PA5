export class Asentamiento {

    #estado;
    #municipio;
    #cp;
    #id_asentamiento;
    #codigo_asentamiento;
    #asentamiento;
    #id_tipo_asentamiento;
    #tipo_asentamiento;

    constructor(estado, municipio, cp, id_asentamiento, codigo_asentamiento, asentamiento, id_tipo_asentamiento, tipo_asentamiento){
        this.#estado = estado;
        this.#municipio = municipio;
        this.#cp = cp;
        this.#id_asentamiento = id_asentamiento;
        this.#codigo_asentamiento = codigo_asentamiento;
        this.#asentamiento = asentamiento;
        this.#id_tipo_asentamiento = id_tipo_asentamiento;
        this.#tipo_asentamiento = tipo_asentamiento;
    }

    obtenerEstado = () => {
        return this.#estado;
    }

    obtenerMunicipio = () => {
        return this.#municipio;
    }

    obtenerCP = () => {
        return this.#cp;
    }

    obtenerIdAsentamiento = () => {
        return this.#id_asentamiento;
    }

    obtenerCodigoAsentamiento = () => {
        return this.#codigo_asentamiento;
    }

    obtenerAsentamiento = () => {
        return this.#asentamiento;
    }

    obtenerIdTipoAsentamiento = () => {
        return this.#id_tipo_asentamiento;
    }

    obtenerTipoAsentamiento = () => {
        return this.#tipo_asentamiento;
    }

}