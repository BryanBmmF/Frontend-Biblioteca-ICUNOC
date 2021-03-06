import { Component, OnInit } from '@angular/core';
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

  constructor(public userService: UsersService) {}

  //ngOnInit(): void {
  //}

  register() {
    const user = {numeroRegistro:this.numeroRegistro, user: this.user, password: this.password };
    this.userService.register(user).subscribe(data => {
      console.log(data);
    });
  }

}
