import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(private http:HttpClient) { }

  Url = 'http://localhost:8082/detalleslibros';

  getLibroId(id:String){
    return this.http.get<Libro>(this.Url+"/"+id);
  }

}
