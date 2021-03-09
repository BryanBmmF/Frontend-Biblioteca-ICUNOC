import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { UsersService } from '../service/users/users.service';

@Component({
  selector: 'app-lista-user',
  templateUrl: './lista-user.component.html',
  styleUrls: ['./lista-user.component.css']
})
export class ListaUserComponent implements OnInit {

  users: User[] =[];
  
  constructor(private userService: UsersService,
    private toastr: ToastrService ) { }

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
    this.userService.delete(id).subscribe(
      data => {
        //lanzamos el mensaje de eliminacion y cargamos la tabla
        this.toastr.info('El usuario se elimino correctamente!', 'Ok!', {
          timeOut: 5000, positionClass: 'toast-top-center'
        });
        this.cargarUsuarios();
      },
      err => {
        //si sucede algun fallo, mostramos el error que envia la api
        this.toastr.error(err.error.mensaje, 'Fail!', {
          timeOut: 5000, positionClass: 'toast-top-center'
        });
      }
    );
  }

}
