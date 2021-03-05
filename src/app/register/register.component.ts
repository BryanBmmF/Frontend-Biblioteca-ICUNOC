import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  //ngOnInit(): void {
  //}

  register() {
    console.log(this.numeroRegistro);
    console.log(this.user);
    console.log(this.password);
    console.log(this.confirmPassword);
  }

}
