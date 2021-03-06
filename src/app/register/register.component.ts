import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UsersService } from "../service/users/users.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  numeroRegistro: string;
  user: string;
  password: string;
  confirmPassword: string;

  constructor(public userService: UsersService) { }

  //metodo para registrar el nuevo usuario
  register() {
    //antes evaluar las constraseñas si son iguales
    if (this.password == this.confirmPassword) {
      //armamos el objeto a guardar
      let user = new User(this.numeroRegistro, this.user, this.password);
      //registramos el usuario
      this.userService.register(user).subscribe(data => {
        console.log(data);
        alert("Usuario registrado!!!");
        //navegar a otra pantalla si asi se desea
      },
      //en caso de error, se debe capturar lo que venga del backend
      error => {
        console.log(error);
        alert("No se pudo completar el registro\n es posible que el usaurio que trata de registrar ya exista!");
      });
    } else {
      alert("Las contraseñas no coinciden!!!");
    }

  }

}
