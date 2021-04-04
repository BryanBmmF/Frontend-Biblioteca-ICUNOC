import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Prestamo } from 'src/app/models/Prestamo';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-revision-reservacion',
  templateUrl: './revision-reservacion.component.html',
  styleUrls: ['./revision-reservacion.component.css']
})
export class RevisionReservacionComponent implements OnInit {

  
  prestamos: Prestamo[] = [];
  prestamoCodigo: Prestamo;
  buttonUsers: boolean = false;
  constructor(private userService: UsersService,
    private prestamoService: PrestamosService,
    private toastr: ToastrService,
    private router: Router) { }

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
    this.prestamoService.listaxEstado("RESERVADO").subscribe(
      data => {
        this.prestamos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onUpdate(codigoReservacion: string, nombre:string): void {
    if (confirm("INICIANDO PRESTAMO DE " + nombre)) {
      this.prestamoService.iniciarPrestamo(codigoReservacion, this.prestamoCodigo).subscribe(
        data => {
          this.toastr.success('Prestamo Iniciado!', 'Ok!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
          this.cargarPrestamos();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Hubo un error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
          this.cargarPrestamos();
        }
      );

    }
  }

  eliminarReservacion(codigoReservacion: string, nombre:string): void {
    if (confirm("¿Está seguro de eliminar la reservación a nombre de " + nombre)) {
      this.prestamoService.eliminarReservacion(codigoReservacion).subscribe(
        data => {
          this.toastr.success('Reservación Eliminada!', 'Ok!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
          this.cargarPrestamos();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Hubo un Error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
          this.cargarPrestamos();
        }
      );

    }
  }

  cargarPrestamoUnico(): void{
    if(this.stringBusqueda.length==8){
      this.cargarPrestamosxCodigoReservacion(this.stringBusqueda);
    }else if(this.stringBusqueda.length==13){
      this.cargarPrestamosxDPI(this.stringBusqueda);
    }else if(this.stringBusqueda.length==9){
      this.cargarPrestamosxCarnet(this.stringBusqueda);
    }else if(this.stringBusqueda.length==10){
      this.cargarPrestamosxFechaInicio(this.stringBusqueda);
    }else{
      this.toastr.error('Dato incorrecto! Intente de nuevo', 'Error!', {
        timeOut: 2000, positionClass: 'toast-top-center'
      });
    }
  }   

  cargarPrestamosxCodigoReservacion(codigoReservacion: string): void {
    this.prestamoService.listaxCodigoReservacion(codigoReservacion).subscribe(
      data => {
        if(data.length==0){
          this.toastr.warning('No hay registros! Intente de nuevo', 'Error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        }else{
          this.prestamos = data;
        }        
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarPrestamosxDPI(dpi: string): void {
    this.prestamoService.listaxDPI(dpi).subscribe(
      data => {
        if(data.length==0){
          this.toastr.warning('No hay registros! Intente de nuevo', 'Error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        }else{
          this.prestamos = data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarPrestamosxCarnet(carnet: string): void {
    this.prestamoService.listaxCarnet(carnet).subscribe(
      data => {
        if(data.length==0){
          this.toastr.warning('No hay registros! Intente de nuevo', 'Error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        }else{
          this.prestamos = data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarPrestamosxFechaInicio(fechaInicio: string): void {
    this.prestamoService.listaxFechaInicio(fechaInicio).subscribe(
      data => {
        if(data.length==0){
          this.toastr.warning('No hay registros! Intente de nuevo', 'Error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        }else{
          this.prestamos = data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }
}
