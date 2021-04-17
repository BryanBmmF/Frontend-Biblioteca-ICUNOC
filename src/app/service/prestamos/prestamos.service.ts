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

  public listaxEstado(estadoPrestamo: string): Observable<Prestamo[]>{
    return this.http.get<Prestamo[]>(this.prestamosURL+'listaPrestamo/'+`${estadoPrestamo}`);
  }

  public finalizarPrestamo(codigoReservacion:string, prestamo: Prestamo): Observable<any>{
    return this.http.put<any>(this.prestamosURL+`finalizar/${codigoReservacion}`,prestamo);
  }

  public iniciarPrestamo(codigoReservacion:string, prestamo: Prestamo): Observable<any>{
    return this.http.put<any>(this.prestamosURL+`iniciar/${codigoReservacion}`,prestamo);
  }

  public eliminarReservacion(id: string){
    return this.http.delete<any>(this.prestamosURL+'eliminar/'+`${id}`);
  }

  public consultarPrestamosReservacionesActivas(dpi: string, carnet: string): Observable<number>{
    return this.http.get<number>(this.prestamosURL+`verificacion/${dpi}/${carnet}`);
  }

  public busquedaFiltrada(busqueda: string, estado: string): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.prestamosURL + `prestamosFiltrados/${busqueda}/${estado}`);
  }

}
