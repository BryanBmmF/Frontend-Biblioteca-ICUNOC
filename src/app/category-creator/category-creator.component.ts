import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../models/categoria';
import { UsersService } from '../service/users/users.service';
import { CategoryService } from '../service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";

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
    private router: Router,
    public dialogo: MatDialog) { }

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
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Esta seguro de registrar esta categoría?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //confirmado
          const category = new Categoria(this.nombre, this.descripcion);
          this.categoryService.save(category).subscribe(
            data => {
              this.toastr.success('Categoría registrada', 'Ok!', {
                timeOut: 5000, positionClass: 'toast-top-center'
              });
              this.router.navigateByUrl('/listaCategoriasAdmin');

            },
            err => {
              this.toastr.error('La categoria ya existe', 'Fail!', {
                timeOut: 5000, positionClass: 'toast-top-center'
              });
              //recargamos la pantalla, pero podriamos ir a otro lado
              //form.reset();
              this.router.navigateByUrl('/crear-categoria');
            }
          );

        }
      });

  }

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }


}
