import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/libro';
import { LibrosService } from '../service/libros/libros.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users/users.service';
import { Categoria } from '../models/categoria';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit {

  libro: Libro = null;
  buttonUsers: boolean = false;
  categorias: Categoria[];
  categoriaElegida: Categoria = null;
  constructor(
    private libroService: LibrosService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.lista().subscribe(categoria => this.categorias = categoria);
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
      const id = this.activatedRoute.snapshot.params.id;
      this.libroService.detalle(id).subscribe(
        data => {
          this.libro = data;
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/listaLibro']);
        }
      );
    }

  }

  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.libroService.update(id, this.libro).subscribe(
      data => {
        this.toastr.success('Libro Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listaLibro']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/listaLibro']);
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
