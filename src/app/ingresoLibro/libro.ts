export class Libro{
    constructor(
      public titulo: string,
      public autor: string,
      public edicion: number,
      public categoria: string,
      public tipo: string,
      public idioma: string,
      public imagen: string,
      public disponibilidad: string,
      public descripcion: string,
      public stock: number
    ){}
}