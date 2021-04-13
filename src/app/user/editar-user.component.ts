import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { UsersService } from '../service/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.css']
})
export class EditarUserComponent implements OnInit {

  confirmPassword: string;
  //tipoUser: string;
  user: User = null;

  constructor(private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    public dialogo: MatDialog) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!this.userService.getLoggedInUserRoleAdmin()) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      const id = this.activatedRoute.snapshot.params.id;
      this.userService.detailId(id).subscribe(
        data => {
          this.user = data;
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

  onUpdate(): void {
    //confirmar
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Esta seguro de actualizar los datos de este usuario?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //confirmado
          if (this.user.password == this.confirmPassword) {
            const id = this.activatedRoute.snapshot.params.id;
            //this.user.tipo = this.tipoUser;
            this.userService.update(id, this.user).subscribe(
              data => {
                //si todo va bien
                this.toastr.success('Usuario actualizado!', 'Ok!', {
                  timeOut: 5000, positionClass: 'toast-top-center'
                });
                //recargamos la pantalla, pero podriamos ir a otro lado
                this.router.navigate(['/usuarios']);
              },
              err => {
                //si sucede algun fallo, mostramos el error que envia la api
                this.toastr.error(err.error.mensaje, 'Fail!', {
                  timeOut: 5000, positionClass: 'toast-top-center'
                });
                //recargamos la pantalla, pero podriamos ir a otro lado
                this.router.navigate(['/usuarios']);
              }
            );
          } else {
            this.toastr.warning("Se debe especificar una nueva contraseña y confirmarla!", 'Fail!', {
              timeOut: 5000, positionClass: 'toast-top-center'
            });
          }
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
