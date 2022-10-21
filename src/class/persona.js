

export class Persona {

    #id_persona;
    #nombre;
    #appat;
    #apmat;
    #fecha_nacimiento;
    #id_sexo;
    #sexo;
    #id_asentamiento;

    constructor(id_persona, nombre, appat, apmat, fecha_nacimiento, id_sexo, sexo, id_asentamiento){
        this.#id_persona = id_persona;
        this.#nombre = nombre;
        this.#appat = appat;
        this.#apmat = apmat;
        this.#fecha_nacimiento = fecha_nacimiento;
        this.#id_sexo = id_sexo;
        this.#sexo = sexo;
        this.#id_asentamiento = id_asentamiento;
    }

    validarDatos = () => {
        const text = /^(\d|\s)+$/
        
        if (text.test(this.#nombre) && text.test(this.#appat) && text.test(this.#apmat) && text.test(this.#sexo)){
            return true;
        } else {
            return false;
        }
    }

    obtenerIdPersona = () => {
        return this.#id_persona;
    }

    obtenerNombre = () => {
        return this.#nombre;
    }

    obtenerAppat = () => {
        return this.#appat;
    }

    obtenerApmat = () => {
        return this.#apmat;
    }

    obtenerFechaNacimiento = () => {
        return this.#fecha_nacimiento;
    }

    obtenerIdSexo = () => {
        return this.#id_sexo
    }

    obtenerSexo = () => {
        return this.#sexo;
    }

    obtenerIdAsentamiento = () => {
        return this.#id_asentamiento;
    }

}