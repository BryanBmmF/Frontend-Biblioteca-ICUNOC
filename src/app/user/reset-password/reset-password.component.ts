import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/service/users/users.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  username: string;
  passwordActual: string;
  nuevoPassword: string;
  confirmNuevoPassword: string;

  user: User = null;
  constructor(private userService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    public dialogo: MatDialog) { }

  ngOnInit(): void {
  }

  onCreate(form: NgForm): void {
    //primero verificamos que el usuario sea real
    this.userService.detailUsername(this.username).subscribe(
      data => {
        this.user = data;
        //si el usuario existe entonces procedemos a actualizarlo
        //confirmar
        this.dialogo
          .open(DialogoConfirmacionComponent, {
            data: `¿Esta seguro de actualizar su contraseña?`
          })
          .afterClosed()
          .subscribe((confirmado: Boolean) => {
            if (confirmado) {
              //confirmado
              const user = { Authorization: 'Basic ' + btoa(this.username + ':' + this.passwordActual) };
              //evaluamos las credenciales del usuario antiguo por medio de autenticacion
              this.userService.login(this.username, this.passwordActual).subscribe(
                data => {
                  //en caso de ningun error en credenciales
                  if (this.nuevoPassword == this.confirmNuevoPassword) {
                    //seteamos el nuevo password
                    this.user.password = this.nuevoPassword;
                    this.userService.update(this.user.id, this.user).subscribe(
                      data => {
                        //si todo va bien
                        this.toastr.success('Contraseña actualizada!', 'Ok!', {
                          timeOut: 5000, positionClass: 'toast-top-center'
                        });
                        //recargamos la pantalla, pero podriamos ir a otro lado
                        //this.router.navigate(['/']);
                      },
                      err => {
                        //si sucede algun fallo, mostramos el error que envia la api
                        this.toastr.error(err.error.mensaje, 'Fail!', {
                          timeOut: 5000, positionClass: 'toast-top-center'
                        });
                        //recargamos la pantalla, pero podriamos ir a otro lado
                        //this.router.navigate(['/']);
                      }
                    );
                  } else {
                    this.toastr.warning("La nueva contraseña no coincide con la confirmación!", 'Advertencia!', {
                      timeOut: 5000, positionClass: 'toast-top-center'
                    });
                  }
                },
                //en caso de error
                error => {
                  console.log(error);
                  this.toastr.warning("La contreseña antigua no es correcta!!", 'Advertencia!', {
                    timeOut: 5000, positionClass: 'toast-top-center'
                  });
                });

            }
          });

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
