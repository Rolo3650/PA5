import { con } from "./conexion.js";

export const obtenerTodasLasPublicaciones = () => {
    const promesa = new Promise((resolve) => {
        con.query('Select * from mpublicacion', (error, result) => {
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

export const obtenerComentariosDePublicacion = (id_publicacion) => {
    const promesa = new Promise((resolve) => {
        con.query('Select * from mcomentario where id_publicacion = '+ id_publicacion + ';', (error, result) => {
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

export const obtenerZona = (id_asentamiento) => {
    const promesa = new Promise((resolve) => {
        con.query('Select * from masentamiento natural join czona natural join cestado natural join cmunicipio where id_asentamiento = '+ id_asentamiento + ';', (error, result) => {
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

export const obtenerImagenesDePublicacion = (id_publicacion) => {
    const promesa = new Promise((resolve) => {
        con.query('Select * from mimagen where id_publicacion = '+ id_publicacion + ';', (error, result) => {
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