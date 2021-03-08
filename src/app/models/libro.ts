export class Libro{
  id?:number;
  titulo:string;
  autor:string;
  edicion:number;
  categoria:string;
  tipo:string;
  idioma:string;
  imagen:string;
  disponibilidad:string;
  descripcion:string;
  stock:number;
    constructor(
      titulo: string,
      autor: string,
      edicion: number,
      categoria: string,
      tipo: string,
      idioma: string,
      imagen: string,
      disponibilidad: string,
      descripcion: string,
      stock: number
    ){
      this.titulo=titulo;
      this.autor=autor;
      this.edicion=edicion;
      this.categoria=categoria;
      this.tipo=tipo;
      this.idioma=idioma;
      this.imagen=imagen;
      this.disponibilidad=disponibilidad;
      this.descripcion=descripcion;
      this.stock=stock;
    }
}