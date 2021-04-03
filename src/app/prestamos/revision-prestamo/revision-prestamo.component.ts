import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Libro } from 'src/app/models/libro';
import { Prestamo } from 'src/app/models/Prestamo';
import { LibrosService } from 'src/app/service/libros/libros.service';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-revision-prestamo',
  templateUrl: './revision-prestamo.component.html',
  styleUrls: ['./revision-prestamo.component.css']
})
export class RevisionPrestamoComponent implements OnInit {

  prestamos: Prestamo[] = [];
  prestamoCodigo: Prestamo;
  libroVerificacion: Libro;
  nuevoStock:number;
  buttonUsers: boolean = false;
  constructor(private userService: UsersService,
    private prestamoService: PrestamosService,
    private librosService:LibrosService,
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
    this.prestamoService.lista().subscribe(
      data => {
        this.prestamos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onUpdate(codigoReservacion: string, nombre:string, costo:number, codigoLibro:string): void {
    if (confirm("FINALIZANDO PRESTAMO DE " + nombre + "\n" + "Total a pagar: Q." + costo)) {
      this.prestamoService.finalizarPrestamo(codigoReservacion, this.prestamoCodigo).subscribe(
        data => {
          this.actualizarStock(codigoLibro);
          this.toastr.success('Pretamo Finalizado!', 'Ok!', {
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

  }

  async actualizarStock(codigoLibro: string) {
    this.librosService.detalleCodigo(codigoLibro)
    .subscribe(data=>{
    this.libroVerificacion=data;
      this.nuevoStock = this.libroVerificacion.stock + 1;
      this.libroVerificacion.stock = this.nuevoStock;
        //En este punto actualizamos el stock del libro reservado
        this.librosService.update(this.libroVerificacion.idLibro, this.libroVerificacion).subscribe(
          data => {
          });
  })
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
        if(data==null){
          this.toastr.warning('No hay registros! Intente de nuevo', 'Error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        }else{
          this.prestamos = [];
          this.prestamos[0] = this.prestamoCodigo;
          this.prestamos[0] = data;
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
