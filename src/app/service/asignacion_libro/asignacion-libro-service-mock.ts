import { of } from 'rxjs';

export class AsignacionLibroServiceMock {

  constructor() { 

  }

  public lista(): any {
    return of([
      {
        id: 1,
        idLibro: 1,
        idCategoria: 1
      },
      {
        id: 2,
        idLibro: 2,
        idCategoria: 2
      },
      {
        id: 3,
        idLibro: 3,
        idCategoria: 3
      },
      {
        id: 4,
        idLibro: 4,
        idCategoria: 4
      },
    ]);
  }

  public listaCategorias(id: number): any {
    return of([
      {
        idCategoria: 1,
        nombre: 'Test1',
        descripcion: 'Descripcion1'
      },
      {
        idCategoria: 2,
        nombre: 'Test2',
        descripcion: 'Descripcion2'
      },
    ])
  }

  public listaLibrosCategoria(id: number): any {
    return of([
      {
        id: 1,
        autor: 'AutorTest1',
        nombre: 'nombreTest1'
      },
      {
        id: 2,
        autor: 'AutorTest2',
        nombre: 'nombreTest2'
      }
    ])
  }

  public save(any): any {
      return of({
        mensaje: 'Guardado con exito'
      })
  }

  public detailId(any): any {
      return of({
        id: 1,
        idLibro: 1,
        idCategoria: 1
      })
  }

  public delete(any): any {
      return of({
        mensaje: 'Eliminado con exito'
      })
  }

  public deleteAssignations(any): any {
    return of({
      mensaje: 'Eliminados con exito'
    })
}
}
