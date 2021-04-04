import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AsignacionLibro } from '../../models/asignacion_libro'
import { Categoria } from 'src/app/models/categoria';
import { Libro } from 'src/app/models/libro';

@Injectable({
  providedIn: 'root'
})
export class AsignacionLibroService {

  constructor(private httpClient: HttpClient) { 

  }

  public lista(): Observable<AsignacionLibro[]> {
    return this.httpClient.get<AsignacionLibro[]>('http://localhost:8082/asignacionlibros/lista')
  }

  public listaCategorias(id: number): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`http://localhost:8082/asignacionlibros/categoriasLibro/${id}`);
  }

  public listaLibrosCategoria(id: number): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(`http://localhost:8082/asignacionlibros/librosCategoria/${id}`);
  }

  public save(asignacion: AsignacionLibro): Observable<any> {
      return this.httpClient.post<any>('http://localhost:8082/asignacionlibros/crearAsignacion', asignacion);
  }

  public detailId(id: number): Observable<AsignacionLibro> {
      return this.httpClient.get<AsignacionLibro>(`http://localhost:8082/asignacionlibros/lista/${id}`);
  }

  public delete(id: number): Observable<any> {
      return this.httpClient.delete<any>(`http://localhost:8082/asignacionlibros/eliminar/${id}`);
  }

  public deleteAssignations(id: number): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:8082/asignacionlibros/eliminarAsignaciones/${id}`);
}
}
