import { of } from 'rxjs';

export class CategoriaServiceMock {

  constructor() { 

  }

  public lista(): any {
    return of([
      {
        idCategoria: 1,
        nombre: 'categoriatest1',
        descripcion: 'descripciontest1'
      },
      {
        idCategoria: 2,
        nombre: 'categoriatest2',
        descripcion: 'descripciontest2'
      },
    ]);
  }

  public save(any): any {
      return of({
        mensaje: 'Guardado con exito'
      })
  }

  public detailId(any): any {
      return of({
        idCategoria: 1,
        nombre: 'categoriatest1',
        descripcion: 'descripciontest1'
      })
  }

  public update(id: any,category: any): any {
    return of({
        mensaje: 'La categoria se actualizó correctamente'
    })
  }

  public delete(any): any {
      return of({
        mensaje: 'Eliminado con exito'
      })
  }

}
