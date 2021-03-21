import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria'
@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    categoryURL: 'http://localhost:8082/categorias/';

    constructor(private httpClient: HttpClient) {

    }

    public lista(): Observable<Categoria[]> {
        return this.httpClient.get<Categoria[]>('http://localhost:8082/categorias/lista')
    }

    public save(category: Categoria): Observable<any> {
        return this.httpClient.post<any>('http://localhost:8082/categorias/crearCategoria', category);
    }

    public detailId(id: number): Observable<Categoria> {
        return this.httpClient.get<Categoria>(`http://localhost:8082/categorias/lista/${id}`);
    }

    public update(id: number, category: Categoria): Observable<any> {
        return this.httpClient.put<any>(`http://localhost:8082/categorias/actualizar/${id}`, category);
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.delete<any>(`http://localhost:8082/categorias/eliminar/${id}`);
      }
}