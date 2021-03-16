export class Libro{
  idLibro?:number;
  autor:string;
  codigo:string;
  edicion:number;
  fechaPublicacion:string;
  idioma:string;
  nombre:string;
  pathImagen:string;
  stock:number;
  idCategoria: number

  constructor(
    autor: string,
    codigo: string,
    edicion: number,
    fechaPublicacion:string,
    idioma: string,
    nombre:string,
    pathImagen: string,
    stock: number,
    idCategoria: number,
  ){
    this.autor=autor;
    this.codigo=codigo;
    this.edicion=edicion;
    this.fechaPublicacion=fechaPublicacion;
    this.idioma=idioma;
    this.nombre=nombre;
    this.pathImagen=pathImagen;
    this.stock=stock;
    this.idCategoria=idCategoria;
  }
}