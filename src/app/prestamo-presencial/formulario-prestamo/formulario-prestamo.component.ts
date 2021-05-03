import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { LibrosService } from 'src/app/service/libros/libros.service';
import { MatDialog } from '@angular/material/dialog';
import { Libro } from 'src/app/models/libro';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";
import { Prestamo } from '../../models/Prestamo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-formulario-prestamo',
  templateUrl: './formulario-prestamo.component.html',
  styleUrls: ['./formulario-prestamo.component.css']
})
export class FormularioPrestamoComponent implements OnInit {


  libroRecivido: Libro;
  libroVerificacion: Libro;
  codigoVar: string;
  nombreVar: string;
  idLibroVar: string;
  codigoReservacionVar: string;
  nuevoStock: number;

  buttonUsers: boolean = false;
  stringBusqueda: string;
  nombre: string;
  apellido: string;
  DPI: string;
  carnet: string;
  carrera: string;
  correo: string;
  cantidadActivos: number;
  inputNombre: boolean = true;
  inputApellido: boolean = true;
  inputCarrera: boolean = true;
  inputCarnet: boolean = false;
  inputDPI: boolean = false;

  constructor(private router: Router,
    private prestamoService: PrestamosService,
    private librosService: LibrosService,
    private toastr: ToastrService,
    private userService: UsersService,
    public dialogo: MatDialog,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
      this.idLibroVar = this.activatedRoute.snapshot.params.codigo;
    }
  }

  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }

  verificarID() {
    if ((this.DPI === undefined && this.carnet === undefined) || (this.DPI === "" && this.carnet === "")) {
      this.toastr.error('Ingrese una identificacion a comprobar.', 'Ups!', {
        timeOut: 5000, positionClass: 'toast-top-center'
      });
    } else {
      if (this.DPI === undefined || this.DPI === "") {
        this.DPI = "NA";
      }
      if (this.carnet === undefined || this.carnet === "") {
        this.carnet = "NA";
      }
      this.prestamoService.consultarPrestamosReservacionesActivas(this.DPI, this.carnet)
        .subscribe(data => {
          this.cantidadActivos = data;
          if (this.cantidadActivos < 2) {
            this.toastr.success('La persona si puede realizar el prestamo.', 'Ok!', {
              timeOut: 5000, positionClass: 'toast-top-center'
            });
            this.inputNombre = false;
            this.inputApellido = false;
            this.inputCarrera = false;
            this.inputCarnet = true;
            this.inputDPI = true;
          } else {
            this.toastr.error('La persona ha superado el limite de reservaciones/prestamos activos.', 'Ups!', {
              timeOut: 5000, positionClass: 'toast-top-center'
            });
          }
        })
    }
  }

  resetearBusqueda() {
    this.inputNombre = true;
    this.inputApellido = true;
    this.inputCarrera = true;
    this.inputCarnet = false;
    this.inputDPI = false;

    this.DPI = "";
    this.carnet = "";

    this.nombre = "";
    this.carrera = "";
    this.apellido = "";
  }

  async generarReservacion() {
    this.prestamoService.consultarPrestamosReservacionesActivas(this.DPI, this.carnet)
      .subscribe(data => {
        this.cantidadActivos = data;
        if (this.cantidadActivos < 2) {
          this.librosService.detalleCodigo(this.idLibroVar)
            .subscribe(data => {
              this.libroVerificacion = data;
              //Verificamos en el momento de presionar el boton que exista stock suficiente del libro a reservar
              if (this.libroVerificacion.stock >= 1) {
                this.nuevoStock = this.libroVerificacion.stock - 1;
                this.libroVerificacion.stock = this.nuevoStock;

                //confirmar
                this.dialogo
                  .open(DialogoConfirmacionComponent, {
                    data: `¿Esta seguro de registrar el prestamo de este libro?`
                  })
                  .afterClosed()
                  .subscribe((confirmado: Boolean) => {
                    if (confirmado) {
                      //confirmado
                      const nuevoPrestamo = new Prestamo(this.nombre, this.apellido, this.DPI, this.carnet, this.carrera, '', '', '', 0, 'ACTIVO', 'NA', false, 0, this.idLibroVar);
                      this.prestamoService.crearPrestamo(nuevoPrestamo).subscribe(
                        data => {
                          this.toastr.success('Prestamo Registrado', 'Ok!', {
                            timeOut: 5000, positionClass: 'toast-top-center'
                          });
                          //En este punto actualizamos el stock del libro reservado
                          this.librosService.update(this.libroVerificacion.idLibro, this.libroVerificacion).subscribe(
                            data => {
                            });
                          this.router.navigate(['/revisarPrestamos']);
                        },
                        err => {
                          this.toastr.error(err.error.mensaje, 'Hubo un Error!', {
                            timeOut: 5000, positionClass: 'toast-top-center'
                          });
                          this.router.navigate(['/revisarPrestamos']);
                        }
                      );
                    }
                  });
              }
              //Si no hay suficientes libros emitimos una alerta al usuario.
              else {
                this.toastr.error('Este libro ya no cuenta con existencias para proceder.', 'Ups!', {
                  timeOut: 5000, positionClass: 'toast-top-center'
                });
                this.router.navigate(['/revisarPrestamos']);
              }
            })
        } else {
          this.toastr.error('La persona has superado el limite de reservaciones/prestamos activos.', 'Ups!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/revisarPrestamos']);
        }
      })
  }

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

}
