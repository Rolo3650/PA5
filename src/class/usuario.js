export class Usuario{

    #id_usuario;
    #correo;
    #contrasenia;
    #id_persona;
    #persona;
    #id_tipo_usuario;
    #tipo_usuario;

    constructor(id_usuario, correo, contrasenia, id_persona, persona, id_tipo_usuario, tipo_usuario){
        this.#id_usuario = id_usuario;
        this.#correo = correo;
        this.#contrasenia = contrasenia;
        this.#id_persona = id_persona;
        this.#persona = persona;
        this.#id_tipo_usuario = id_tipo_usuario;
        this.#tipo_usuario = tipo_usuario;
    }

    validarDatos = () => {
        const text = /^(\w)+$/;

        if (text.test(this.#correo) && text.test(this.#contrasenia)){
            return true;
        } else {
            return false;
        }
    }

    obtenerIdUsuario = () => {
        return this.#id_usuario;
    }

    obtenerCorreo = () => {
        return this.#correo;
    }

    obtenerContrasenia = () => {
        return this.#contrasenia;
    }

    obtenerIdPersona = () => {
        return this.#id_persona;
    }

    obtenerPersona = () => {
        return this.#persona;
    }

    obtenerIdTipoUsuario = () => {
        return this.#id_tipo_usuario;
    }

    obtenerTipoUsuario = () => {
        return this.#tipo_usuario;
    }

}