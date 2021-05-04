import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Libro } from 'src/app/models/libro';
import { Prestamo } from 'src/app/models/Prestamo';
import { LibrosService } from 'src/app/service/libros/libros.service';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { UsersService } from 'src/app/service/users/users.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import moment from 'moment';

@Component({
  selector: 'app-revision-prestamo',
  templateUrl: './revision-prestamo.component.html',
  styleUrls: ['./revision-prestamo.component.css']
})
export class RevisionPrestamoComponent implements OnInit {

  prestamos: Prestamo[] = [];
  prestamoCodigo: Prestamo;
  libroVerificacion: Libro;
  nuevoStock: number;
  buttonUsers: boolean = false;
  constructor(private userService: UsersService,
    private prestamoService: PrestamosService,
    private librosService: LibrosService,
    private toastr: ToastrService,
    private router: Router,
    public dialogo: MatDialog) { }

  stringBusqueda: string;
  ngOnInit(): void {
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
      this.cargarPrestamos();
    }
  }

  translateDate(date:any):any {
    return moment(date).locale('es-mx').format('LL')
  }

  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }

  cargarPrestamos(): void {
    this.prestamoService.listaxEstado("ACTIVO").subscribe(
      data => {
        this.prestamos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onUpdate(codigoReservacion: string, nombre: string, costo: number, codigoLibro: string): void {
    //confirmacion
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Esta seguro de finalizar el prestamo adjudicado a ` + nombre + `?. El total a pagar es de: Q.` + costo
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //confirmado
          this.prestamoService.finalizarPrestamo(codigoReservacion, this.prestamoCodigo).subscribe(
            data => {
              this.actualizarStock(codigoLibro);
              this.toastr.success('Prestamo Finalizado!', 'Ok!', {
                timeOut: 2000, positionClass: 'toast-top-center'
              });
              this.cargarPrestamos();
            },
            err => {
              this.toastr.error(err.error.mensaje, 'Fail!', {
                timeOut: 2000, positionClass: 'toast-top-center'
              });
              this.cargarPrestamos();
            }
          );
        }
      });

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

  cargarPrestamosFiltrados(): void {
    this.prestamoService.busquedaFiltrada(this.stringBusqueda, "ACTIVO").subscribe(
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

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

}
