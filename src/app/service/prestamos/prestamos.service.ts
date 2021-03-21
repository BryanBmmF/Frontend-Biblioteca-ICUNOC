import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../../models/Prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private http:HttpClient) { }

  productoURL = 'http://localhost:8082/reserva/';

  public detail(id: string): Observable<Prestamo> {
    return this.http.get<Prestamo>(this.productoURL + `${id}`);
  }
}
