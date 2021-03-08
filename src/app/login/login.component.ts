import { Component, OnInit } from '@angular/core';
import { UsersService } from "../service/users/users.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //variables bindeadas de los imput en la vista login
  user: string;
  password: string;

  constructor(public userService: UsersService, public router: Router, private toastr: ToastrService) { }

  //metodo para hacer funcionar el boton de  login
  login() {
    //preparamos las credenciales
    const user = { Authorization: 'Basic ' + btoa(this.user + ':' + this.password) };
    //las enviamos
    this.userService.login(this.user, this.password).subscribe(
      data => {
        console.log(data);
        //guardamos el token obtenido
        this.userService.setToken(data.token);
        this.router.navigateByUrl('/catalogo');
      },
      //en caso de error
      error => {
        console.log(error);
        this.toastr.warning("Los datos ingresados no son correctos!!", 'Advertencia!', {
          timeOut: 5000, positionClass: 'toast-top-center'
        });
      });
  }

}
