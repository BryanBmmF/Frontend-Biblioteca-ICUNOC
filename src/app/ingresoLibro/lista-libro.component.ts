import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/libro';
import { LibrosService } from '../service/libros/libros.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users/users.service';
import { Router } from '@angular/router';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service';

@Component({
  selector: 'app-lista-libro',
  templateUrl: './lista-libro.component.html',
  styleUrls: ['./lista-libro.component.css']
})
export class ListaLibroComponent implements OnInit {

  libros: Libro[] = [];
  buttonUsers: boolean = false;
  stringBusqueda: string; 

  constructor(
    private libroService: LibrosService,
    private userService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private asignacionLibroService: AsignacionLibroService
    ) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
      this.cargarLibros();
    }
   
  }
  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }

  cargarLibros(): void {
    this.libroService.lista().subscribe(
      data => {
        this.libros = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    if (confirm("¿Esta seguro de eliminar permanentemente este libro?")) {
      this.asignacionLibroService.deleteAssignations(id).subscribe(
        data => {
          this.libroService.delete(id).subscribe(
            data => {
              this.toastr.info('El libro se elimino correctamente!', 'Ok!', {
                timeOut: 5000, positionClass: 'toast-top-center'
              });
              this.cargarLibros();
            },
            err => {
              console.log(err)
              this.toastr.error(err.error.mensaje, 'Fail!', {
                timeOut: 5000, positionClass: 'toast-top-center'
              });
            }
          );
        },
        err => {
          console.log(err)
          this.toastr.error(err.error.mensaje, 'Fail!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
        }
      )
    }
  }

  cargarLibrosFiltrados(): void {
    this.libroService.busquedaFiltrada(this.stringBusqueda).subscribe(
      data => {
        if(data.length==0){
          this.toastr.warning('No se encontró ningún libro. Intenta de nuevo', 'Ups!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        }else{
          this.libros = data;
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
