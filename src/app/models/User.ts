export class User{
    id?:number;
    nombre: string;
    numeroRegistro: string;
    username: string;
    password: string;
    tipo: string;
    correo: string;

    constructor(nombre:string, numeroRegistro: string, username: string, password: string, tipo:string, correo:string){
        this.nombre = nombre;
        this.numeroRegistro= numeroRegistro;
        this.username= username;
        this.password = password;
        this.tipo = tipo;
        this.correo = correo;
    }

}