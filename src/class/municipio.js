export class Municipio {

    #id_municipio;
    #municipio;

    constructor(id_municipio, municipio){
        this.#id_municipio = id_municipio;
        this.#municipio = municipio;
    }

    obtenerIdMunicipio = () => {
        return this.#id_municipio;
    }

    obtenerMunicipio = () => {
        return this.#municipio;
    }

}