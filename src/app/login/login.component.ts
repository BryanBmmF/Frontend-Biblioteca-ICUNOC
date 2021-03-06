import { Component, OnInit } from '@angular/core';
import { UsersService } from "../service/users/users.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //variables bindeadas de los imput en la vista login
  user: string;
  password: string;

  constructor(public userService: UsersService, public router: Router) {}

  //este metodo es para hacer algo al mostrar la pagina, pero no queremos
  //ngOnInit(): void {
  //}

  //metodo para hacer funcionar el boton de  login
  login() {
    //preparamos las credenciales
    const user = {Authorization: 'Basic '+ btoa(this.user + ':' + this.password)};
    //las enviamos
    this.userService.login(this.user, this.password).subscribe( data => {
      console.log(data);
      //guardamos el token obtenido
      this.userService.setToken(data.token);
      this.router.navigateByUrl('/catalogo');
    },

    //en caso de error
    error => {
      console.log(error);
      alert("Los datos ingresados\n no son correctos!");
    });
  }

}
