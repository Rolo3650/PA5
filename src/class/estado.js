export class Estado {

    #id_estado;
    #estado;

    constructor(id_estado, estado){
        this.#id_estado = id_estado;
        this.#estado = estado;
    }

    obtenerIdEstado = () => {
        return this.#id_estado;
    }

    obtenerEstado = () => {
        return this.#estado;
    }

}