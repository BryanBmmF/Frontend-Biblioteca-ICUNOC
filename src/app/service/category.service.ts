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
}