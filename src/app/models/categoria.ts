export class Categoria {
    idCategoria?: number;
    nombre: string;
    descripcion: string;
    libros?: any;

    constructor(nombre:string, descripcion: string, idCategoria?: number, libros?: any){
        this.idCategoria = idCategoria;
        this.nombre = nombre;
        this.descripcion= descripcion;
        this.libros = libros;
    }
    

    

    
}
