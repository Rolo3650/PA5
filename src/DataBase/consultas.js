import { con } from "./conexion.js";

export class Consultas {

    constructor(){
        this.con = con;
    }

    obtenerTodasLasPublicaciones = () => {
        const promesa = new Promise((resolve) => {
            this.con.query('Select * from mpublicacion', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    resolve(result);
                }
            })
        });
        const publicaciones = promesa;
        return publicaciones;
    }

    obtenerComentariosDePublicacion = (id_publicacion) => {
        const promesa = new Promise((resolve) => {
            this.con.query('Select * from mcomentario where id_publicacion = ' + id_publicacion + ';', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    resolve(result);
                }
            })
        });
        const comentarios = promesa;
        return comentarios;
    }

    obtenerEstados = () => {
        const promesa = new Promise((resolve) => {
            this.con.query('Select * from cestado;', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    resolve(result);
                }
            })
        });
        const estados = promesa;
        return estados;
    }

    obtenerMunicipios = () => {
        const promesa = new Promise((resolve) => {
            this.con.query('Select * from cmunicipio;', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    resolve(result);
                }
            })
        });
        const municipios = promesa;
        return municipios;
    }

    obtenerZona = (id_asentamiento) => {
        const promesa = new Promise((resolve) => {
            this.con.query('Select * from masentamiento natural join czona natural join cestado natural join cmunicipio where id_asentamiento = ' + id_asentamiento + ';', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    resolve(result);
                }
            })
        });
        const zona = promesa;
        return zona;
    }

    obtenerTodasLasZonas = () => {
        const promesa = new Promise((resolve) => {
            this.con.query('Select * from masentamiento natural join czona natural join cestado natural join cmunicipio;', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    resolve(result);
                }
            })
        });
        const zona = promesa;
        return zona;
    }

    obtenerImagenesDePublicacion = (id_publicacion) => {
        const promesa = new Promise((resolve) => {
            this.con.query('Select * from mimagen where id_publicacion = ' + id_publicacion + ';', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    resolve(result);
                }
            })
        });
        const imagenes = promesa;
        return imagenes;
    }

    obtenerTiposDeCategorias = () => {
        const promesa = new Promise((resolve) => {
            this.con.query('Select * from ccategoria_publicacion;', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    resolve(result);
                }
            })
        });
        const categorias = promesa;
        return categorias;
    }
}