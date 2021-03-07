import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UsersService } from '../service/users/users.service';

@Component({
  selector: 'app-lista-user',
  templateUrl: './lista-user.component.html',
  styleUrls: ['./lista-user.component.css']
})
export class ListaUserComponent implements OnInit {

  users: User[] =[];
  
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    //cargar al momento de mostrar la pantalla
    this.cargarUsuarios()
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

  borrar(id: number){
    alert('borrar el '+id);
  }

}
