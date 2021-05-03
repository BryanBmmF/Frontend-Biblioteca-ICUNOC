export class Comentario {

    id: number;
    identificacion: string;
    nombre: string;
    comentario: string;
    fecha: string;
    puntuacion: number;
    idLibro: string;

    constructor(identificacion: string,nombre: string,comentario: string,fecha: string,puntuacion: number,idLibro: string,id?: number) {
        this.id = id;
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.comentario = comentario;
        this.fecha = fecha;
        this.puntuacion = puntuacion;
        this.idLibro = idLibro;
    }
}
