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

  constructor(private userService: UsersService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router) { }


  onCreate(form: NgForm): void {
    if (confirm("¿Esta seguro de registrar esta categoría?")) {
      const category = new Categoria(this.nombre, this.descripcion);
      this.categoryService.save(category).subscribe(
        data => {
          this.toastr.success('Usuario Registrado!', 'Ok!', {
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
