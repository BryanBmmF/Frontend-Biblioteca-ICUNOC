import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-revision-prestamo',
  templateUrl: './revision-prestamo.component.html',
  styleUrls: ['./revision-prestamo.component.css']
})
export class RevisionPrestamoComponent implements OnInit {
  buttonUsers: boolean = false;
  constructor(private userService: UsersService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu()
    }
  }

  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

}
