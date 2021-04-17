import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Prestamo } from 'src/app/models/Prestamo';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { UsersService } from 'src/app/service/users/users.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";

@Component({
  selector: 'app-revision-reservacion-vencida',
  templateUrl: './revision-reservacion-vencida.component.html',
  styleUrls: ['./revision-reservacion-vencida.component.css']
})
export class RevisionReservacionVencidaComponent implements OnInit {

  prestamos: Prestamo[] = [];
  prestamoCodigo: Prestamo;
  buttonUsers: boolean = false;
  constructor(private userService: UsersService,
    private prestamoService: PrestamosService,
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

  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }

  cargarPrestamos(): void {
    this.prestamoService.listaxEstado("EXPIRADO").subscribe(
      data => {
        this.prestamos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onUpdate(codigoReservacion: string, nombre:string, costo:number): void {
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
  
  cargarPrestamosFiltrados(): void {
    this.prestamoService.busquedaFiltrada(this.stringBusqueda, "EXPIRADO").subscribe(
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
