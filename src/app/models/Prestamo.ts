export class Prestamo{
    id?:number;
    nombre:string;
    apellido:string;
    dpi:string;
    carnet:string;
    carrera:string;
    fechaReservacion:string;
    fechaInicio:string;
    fechaFin:string;
    costo:number;
    estado: string;
    codigoReservacion: string;
    mora: boolean;
    diasMoroso: number;
    codigoLibro: string;

    constructor(
        nombre:string,
        apellido:string,
        dpi:string,
        carnet:string,
        carrera:string,
        fechaReservacion:string,
        fechaInicio:string,
        fechaFin:string,
        costo:number,
        estado: string,
        codigoReservacion: string,
        mora: boolean,
        diasMoroso: number,
        codigoLibro: string
    ){
        this.nombre=nombre;
        this.apellido=apellido;
        this.dpi=dpi;
        this.carnet=carnet;
        this.carrera=carrera;
        this.fechaReservacion = fechaReservacion;
        this.fechaInicio=fechaInicio;
        this.fechaFin=fechaFin;
        this.costo=costo;
        this.estado=estado;
        this.codigoReservacion=codigoReservacion;
        this.mora=mora;
        this.diasMoroso=diasMoroso;
        this.codigoLibro=codigoLibro;
    }
}