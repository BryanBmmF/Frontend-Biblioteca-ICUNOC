export class InfoBiblioteca{
    correo: string;
    direccion: string;
    telefono: string;
    horario: string;
    diasHabilesPrestamo: number;
    costoDiaMoroso: number;
    costoGeneralPrestamo: number;

    constructor(correo:string, direccion:string, telefono:string, horario: string, diasHabilesPrestamo: number, costoDiaMoroso: number, costoGeneralPrestamo:number){
        this.correo= correo;
        this.direccion= direccion;
        this.telefono= telefono;
        this.horario = horario;
        this.diasHabilesPrestamo = diasHabilesPrestamo;
        this.costoDiaMoroso = costoDiaMoroso;
        this.costoGeneralPrestamo = costoGeneralPrestamo;

    }
}