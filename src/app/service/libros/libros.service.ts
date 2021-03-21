import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(private http:HttpClient) { }

  Url = 'http://localhost:8082/detalleslibros';
  libroURL = 'http://localhost:8082/ingresoLibro/'; 

  getLibroId(id:String){
    return this.http.get<Libro>("http://localhost:8082/detalleslibros/"+id);
  }


//CODIGO PARA CRUD DE LIBRO
  public lista(): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.libroURL+'listaLibro');
  }
  public detalle(id:number): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.libroURL+'detalleLibro/${id}');
  }

  public save(libro: Libro): Observable<any>{
    return this.http.post<any>(this.libroURL+'crearLibro',libro);
  }

  public update(id:number, libro: Libro): Observable<any>{
    return this.http.put<any>(this.libroURL+'actualizar/${id}',libro);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>((this.libroURL+'eliminar/${id}'));
  }
}
