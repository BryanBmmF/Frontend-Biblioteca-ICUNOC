export class User{
    id:number;
    numeroRegistro: string;
    username: string;
    password: string;

    constructor(numeroRegistro: string, username: string, password: string){
        this.numeroRegistro= numeroRegistro;
        this.username= username;
        this.password = password;
    }

}