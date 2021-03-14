import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { UsersService } from '../service/users/users.service';

@Component({
  selector: 'app-lista-user',
  templateUrl: './lista-user.component.html',
  styleUrls: ['./lista-user.component.css']
})
export class ListaUserComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UsersService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    //Este componente solo puede ser accedido por usuarios administradores
    //pruebas de autenticacion de token
    console.log("Este es el token guardado en cache: ", this.userService.getToken());
    this.userService.getAdminLogged().subscribe(
      data => {
        console.log(data);
        if (data.message == "NO_AUTORIZADO") {
          this.router.navigateByUrl('/');
        }
        //el codigo que se desee cargar va aqui
        this.cargarUsuarios();
      },
      //en caso de error
      error => {
        console.log(error);
        this.router.navigateByUrl('/');
      });


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

  borrar(id: number) {
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

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

}
