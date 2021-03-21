import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-registrar-devolucion',
  templateUrl: './registrar-devolucion.component.html',
  styleUrls: ['./registrar-devolucion.component.css']
})
export class RegistrarDevolucionComponent implements OnInit {

  constructor(private userService: UsersService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
    }
  }

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

}
