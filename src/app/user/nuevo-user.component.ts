import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { UsersService } from '../service/users/users.service';

@Component({
  selector: 'app-nuevo-user',
  templateUrl: './nuevo-user.component.html',
  styleUrls: ['./nuevo-user.component.css']
})
export class NuevoUserComponent {
  nombre: string;
  numeroRegistro: string;
  username: string;
  password: string;
  confirmPassword: string;
  tipoUser: string;
  correo: string;

  constructor(private userService: UsersService,
    private toastr: ToastrService,
    private router: Router) { }
    ngOnInit(): void {
      //comprobar sesion
      if (!this.userService.getLoggedInUserRoleAdmin()) {
        this.router.navigate(['/']);
      } else {
        /* Codigo que se quiera cargar al inicio */
      }
    }

  onCreate(form: NgForm): void {
    //confirmar
    if (confirm("Esta seguro de registrar este usuario!")) {
      //antes evaluar las constraseñas si son iguales
      if (this.password == this.confirmPassword) {
        const user = new User(this.nombre, this.numeroRegistro, this.username, this.password, this.tipoUser, this.correo);
        this.userService.save(user).subscribe(
          data => {
            //si todo va bien
            this.toastr.success('Usuario Registrado!', 'Ok!', {
              timeOut: 5000, positionClass: 'toast-top-center'
            });
            //recargamos la pantalla, pero podriamos ir a otro lado
            form.reset();
            this.router.navigate(['/usuarios']);

          },
          err => {
            //si sucede algun fallo, mostramos el error que envia la api
            this.toastr.error(err.error.mensaje, 'Fail!', {
              timeOut: 5000, positionClass: 'toast-top-center'
            });
            //recargamos la pantalla, pero podriamos ir a otro lado
            //form.reset();
            this.router.navigate(['/registro-usuario']);
          }
        );
      } else {
        this.toastr.warning("Las contraseñas no coinciden !", 'Fail!', {
          timeOut: 5000, positionClass: 'toast-top-center'
        });
      }

    }
    
  }
  
  logout(){
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }


}
