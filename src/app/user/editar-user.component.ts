import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UsersService } from '../service/users/users.service';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.css']
})
export class EditarUserComponent implements OnInit {

  users: User[] =[];
  
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  cargarUsuarios(): void {
    this.userService.lista().subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
