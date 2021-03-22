import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/libro';
import { LibrosService } from '../service/libros/libros.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-libro',
  templateUrl: './lista-libro.component.html',
  styleUrls: ['./lista-libro.component.css']
})
export class ListaLibroComponent implements OnInit {

  libros: Libro[] = [];
  buttonUsers: boolean = false;
  constructor(
    private libroService: LibrosService,
    private userService: UsersService,
    private router: Router,
    private toastr: ToastrService
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
      this.libroService.delete(id).subscribe(
        data => {
          console.log(id);  
          //lanzamos el mensaje de eliminacion y cargamos la tabla
          this.toastr.info('El libro se elimino correctamente!', 'Ok!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
          this.cargarLibros();
        },
        err => {
          console.log(id);
          //si sucede algun fallo, mostramos el error que envia la api
          this.toastr.error(err.error.mensaje, 'Fail!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
        }
      );
    }

  }
  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }
}
