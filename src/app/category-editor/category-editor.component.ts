import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users/users.service';
import { Categoria } from '../models/categoria';
import { CategoryService } from '../service/category.service';
@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.css']
})
export class CategoryEditorComponent implements OnInit {

  category: Categoria = null;
  buttonUsers : boolean = false;

  constructor(private userService: UsersService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
      const id = this.activatedRoute.snapshot.params.id;
      this.categoryService.detailId(id).subscribe(
        data => {
          this.category = data;
        },
        err => {
          //si sucede algun fallo, mostramos el error que envia la api
          this.toastr.error(err.error.mensaje, 'Fail!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
        }
      );
    }
  }

  validarMenu(){
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
        this.buttonUsers = !this.buttonUsers;
    }
  }

  onUpdate(): void {
    if (confirm("¿Esta seguro de actualizar los datos de esta categoría?")) {
      const id = this.activatedRoute.snapshot.params.id;
      this.categoryService.update(id, this.category).subscribe(
        data => {
          this.toastr.success('Usuario actualizado!', 'Ok!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/listaCategoriasAdmin']);
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/actualizarCategoria']);
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

