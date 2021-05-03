import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibrosService } from '../../service/libros/libros.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../service/users/users.service';
import { Router } from '@angular/router';
import { AsignacionLibroService } from '../../service/asignacion_libro/asignacion-libro.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-identificar-libro',
  templateUrl: './identificar-libro.component.html',
  styleUrls: ['./identificar-libro.component.css']
})
export class IdentificarLibroComponent implements OnInit {

  libros: Libro[] = [];
  buttonUsers: boolean = false;
  stringBusqueda: string;

  constructor(
    private libroService: LibrosService,
    private userService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private asignacionLibroService: AsignacionLibroService,
    public dialogo: MatDialog
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

  cargarLibrosFiltrados(): void {
    this.libroService.busquedaFiltrada(this.stringBusqueda).subscribe(
      data => {
        if (data.length == 0) {
          this.toastr.warning('No se encontró ningún libro. Intenta de nuevo', 'Ups!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        } else {
          this.libros = data;
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
