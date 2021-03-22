import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../models/categoria';
import { UsersService } from '../service/users/users.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-creator',
  templateUrl: './category-creator.component.html',
  styleUrls: ['./category-creator.component.css']
})
export class CategoryCreatorComponent {
  nombre: string;
  descripcion: string;
  buttonUsers: boolean = false;

  constructor(private userService: UsersService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
    }

  }
  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }
  onCreate(form: NgForm): void {
    if (confirm("¿Esta seguro de registrar esta categoría?")) {
      const category = new Categoria(this.nombre, this.descripcion);
      this.categoryService.save(category).subscribe(
        data => {
          this.toastr.success('Categoría registrada', 'Ok!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
          form.reset();
          this.router.navigate(['/listaCategoriasAdmin']);

        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
          //recargamos la pantalla, pero podriamos ir a otro lado
          //form.reset();
          this.router.navigate(['/crear-categoria']);
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
