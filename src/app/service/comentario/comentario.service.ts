import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private commentURL: 'http://localhost:8082/comentarios/';

  constructor(private httpClient: HttpClient) { }

  public lista(id:string): Observable<Comentario[]> {
    console.log(id)
    return this.httpClient.get<Comentario[]>(`http://localhost:8082/comentarios/lista/${id}`)
  }

  public save(comentario: Comentario): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8082/comentarios/crearComentario', comentario);
  }
}
