import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Prestamo } from '../models/Prestamo';
import { LibrosService } from '../service/libros/libros.service';
import { PrestamosService } from '../service/prestamos/prestamos.service';
import { UsersService } from '../service/users/users.service';
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";
import { Libro } from '../models/libro';

@Component({
  selector: 'app-cancelar-reservacion',
  templateUrl: './cancelar-reservacion.component.html',
  styleUrls: ['./cancelar-reservacion.component.css']
})
export class CancelarReservacionComponent implements OnInit {

  prestamos: Prestamo[] = [];
  prestamoCodigo: Prestamo;
  libroVerificacion: Libro;
  nuevoStock: number;
  constructor(
    private prestamoService: PrestamosService,
    private librosService: LibrosService,
    private toastr: ToastrService,
    public dialogo: MatDialog) { }

  stringBusqueda: string;
  ngOnInit(): void {
  }

  cargarReservacion(): void {
    this.prestamoService.busquedaFiltrada(this.stringBusqueda, "RESERVADO").subscribe(
      data => {
        if (data.length == 0) {
          this.toastr.warning('No se encontró ninguna reservación. Intenta de nuevo', 'Ups!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        } else {
          this.prestamos = data;
        }
      },
      err => {
        console.log(err);
      }
    );
    this.stringBusqueda = "";
  }

  async actualizarStock(codigoLibro: string) {
    this.librosService.detalleCodigo(codigoLibro)
      .subscribe(data => {
        this.libroVerificacion = data;
        this.nuevoStock = this.libroVerificacion.stock + 1;
        this.libroVerificacion.stock = this.nuevoStock;
        //En este punto actualizamos el stock del libro reservado
        this.librosService.update(this.libroVerificacion.idLibro, this.libroVerificacion).subscribe(
          data => {
          });
      })
  }

  onUpdate(codigoReservacion: string, dpi: string, carnet: number, codigoLibro: string): void {
    //confirmacion
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `Verifica tus datos ` +
        `DPI: ` + dpi + ` y Carné: ` + carnet
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //confirmado
          this.prestamoService.cancelarReservacion(codigoReservacion, this.prestamoCodigo).subscribe(
            data => {
              this.actualizarStock(codigoLibro);
              this.toastr.success('Reservacion Cancelada!', 'Ok!', {
                timeOut: 2000, positionClass: 'toast-top-center'
              });
              this.prestamos=[]
            },
            err => {
              this.toastr.error(err.error.mensaje, 'Fail!', {
                timeOut: 2000, positionClass: 'toast-top-center'
              });
            }
          );
        }
      });
  }
}
