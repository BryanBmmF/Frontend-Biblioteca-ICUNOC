export class Prestamo{
    id?:number;
    nombre:string;
    apellido:string;
    DPI:number;
    carnet:number;
    carrera:string;
    fechaInicio:string;
    fechaFin:string;
    costo:number;
    estado: number;
    codigoReservacion: string;
    codigoLibro: string;

    constructor(
        nombre:string,
        apellido:string,
        DPI:number,
        carnet:number,
        carrera:string,
        fechaInicio:string,
        fechaFin:string,
        costo:number,
        estado: number,
        codigoReservacion: string,
        codigoLibro: string
    ){
        this.nombre=nombre;
        this.apellido=apellido;
        this.DPI=DPI;
        this.carnet=carnet;
        this.carrera=carrera;
        this.fechaInicio=fechaInicio;
        this.fechaFin=fechaFin;
        this.costo=costo;
        this.estado=estado;
        this.codigoReservacion=codigoReservacion;
        this.codigoLibro=codigoLibro;
    }
}