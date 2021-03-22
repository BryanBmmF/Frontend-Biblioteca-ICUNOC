import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../models/categoria';
import { CategoryService } from '../service/category.service';
import { UsersService} from '../service/users/users.service'
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Categoria[] = [];
  buttonUsers : boolean = false;

  constructor(private categoryService: CategoryService,
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
      this.cargarCategorias();
    }
    
  }
  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }

  cargarCategorias(): void {
    this.categoryService.lista().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    if (confirm("¿Esta seguro de eliminar permanentemente esta categoría?")) {
      this.categoryService.delete(id).subscribe(
        data => {
          //lanzamos el mensaje de eliminacion y cargamos la tabla
          this.toastr.info('La categoría se elimino correctamente!', 'Ok!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
          this.cargarCategorias();
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

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

}
