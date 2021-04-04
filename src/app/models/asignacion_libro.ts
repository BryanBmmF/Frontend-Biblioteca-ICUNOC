export class AsignacionLibro {
    id?: number;
    idCategoria: number;
    idLibro: number;

    constructor(idCategoria:number,idLibro:number,id?: number){
        this.idCategoria = idCategoria;
        this.idLibro = idLibro;
        this.id = id;
    }    
}
