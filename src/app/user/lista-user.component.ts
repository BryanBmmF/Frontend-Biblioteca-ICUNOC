import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { UsersService } from '../service/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";

@Component({
  selector: 'app-lista-user',
  templateUrl: './lista-user.component.html',
  styleUrls: ['./lista-user.component.css']
})
export class ListaUserComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    public dialogo: MatDialog) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!this.userService.getLoggedInUserRoleAdmin()) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.cargarUsuarios();
    }

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
    //confirmar
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Esta seguro de eliminar permanentemente este usuario?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //confirmado
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
      });

  }

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

}
