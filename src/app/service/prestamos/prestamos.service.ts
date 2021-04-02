import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../../models/Prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private http:HttpClient) { }

  prestamosURL = 'http://localhost:8082/prestamos/';

  public detail(id: string): Observable<Prestamo> {
    return this.http.get<Prestamo>(this.prestamosURL + `${id}`);
  }

  public save(nuevaReservacion: Prestamo): Observable<any>{
    return this.http.post<any>(this.prestamosURL+'crearReservacion',nuevaReservacion);
  }

  public lista(): Observable<Prestamo[]>{
    return this.http.get<Prestamo[]>(this.prestamosURL+'listaPrestamo/ACTIVO');
  }

  public listaxCodigoReservacion(codigoReservacion: string): Observable<Prestamo>{
    return this.http.get<Prestamo>(this.prestamosURL+`${codigoReservacion}`);
  }

  public listaxDPI(dpi: string): Observable<Prestamo[]>{
    return this.http.get<Prestamo[]>(this.prestamosURL+`dpi/${dpi}`);
  }

  public listaxCarnet(carnet: string): Observable<Prestamo[]>{
    return this.http.get<Prestamo[]>(this.prestamosURL+`carnet/${carnet}`);
  }

  public listaxFechaInicio(fechaInicio: string): Observable<Prestamo[]>{
    return this.http.get<Prestamo[]>(this.prestamosURL+`FechaInicio/${fechaInicio}`);
  }
}
