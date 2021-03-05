import { Component, OnInit } from '@angular/core';
import { UsersService } from "../service/users/users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //variables bindeadas de los imput en la vista login
  user: string;
  password: string;

  constructor(public userService: UsersService) {}

  //este metodo es para hacer algo al mostrar la pagina, pero no queremos
  //ngOnInit(): void {
  //}

  //metodo para hacer funcionar el boton de  login
  login() {
    //preparamos las credenciales
    const user = {Authorization: 'Basic '+ this.user+';'+ this.password};
    //las enviamos
    this.userService.login(user).subscribe( data => {
      console.log(data);
    });
  }

}
