import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Libro } from '../models/libro';
import { LibrosService } from '../service/libros/libros.service';
import { UsersService } from '../service/users/users.service';
import { AsignacionLibroService} from '../service/asignacion_libro/asignacion-libro.service'
import { Categoria } from '../models/categoria';
@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css']
})
export class DetalleLibroComponent implements OnInit {
  libro: Libro = null;
  bytes: string;
  categories: Categoria[];
  buttonUsers: boolean = false;
  constructor(
    private libroService: LibrosService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UsersService,
    private router: Router,
    private asignacionLibroService: AsignacionLibroService
  ) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
      const id = this.activatedRoute.snapshot.params.codigo;
      this.libroService.detalleCodigo(id).subscribe(
        data => {
          this.libro = data;
          this.bytes = 'data:image/jpeg;base64,' + this.libro.pathImagen;
          this.asignacionLibroService.listaCategorias(this.libro.idLibro).subscribe(
            data => {
              this.categories = data;
            }
          )
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.volver();
        }
      );
    }

  }
  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }

  volver(): void {
    this.router.navigate([window.history.back()]);
  }

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }
}
