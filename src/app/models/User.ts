export class User{
    id?:number;
    nombre: string;
    numeroRegistro: string;
    username: string;
    password: string;
    tipo: string;

    constructor(nombre:string, numeroRegistro: string, username: string, password: string, tipo:string){
        this.nombre = nombre;
        this.numeroRegistro= numeroRegistro;
        this.username= username;
        this.password = password;
        this.tipo = tipo;
    }

}