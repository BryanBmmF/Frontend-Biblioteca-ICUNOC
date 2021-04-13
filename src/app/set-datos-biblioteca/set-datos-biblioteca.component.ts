import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InfoBiblioteca } from '../models/InfoBiblioteca';
import { UsersService } from '../service/users/users.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";

@Component({
  selector: 'app-set-datos-biblioteca',
  templateUrl: './set-datos-biblioteca.component.html',
  styleUrls: ['./set-datos-biblioteca.component.css']
})
export class SetDatosBibliotecaComponent implements OnInit {
  buttonUsers: boolean = false;
  infoBiblioteca: InfoBiblioteca = null;

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
      const id = 1;
      this.userService.detailIdInfoBiblioteca(id).subscribe(
        data => {
          this.infoBiblioteca = data;
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
        data: `¿Esta seguro de actualizar los datos de la biblioteca?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //confirmado
          if (isNaN(parseInt(this.infoBiblioteca.diasHabilesPrestamo.toString())) || isNaN(parseFloat(this.infoBiblioteca.costoDiaMoroso.toString())) || isNaN(parseFloat(this.infoBiblioteca.costoGeneralPrestamo.toString()))) {
            //si sucede algun fallo, mostramos el error que envia la api
            this.toastr.warning("Los valores para (Costos) deben ser numero validos \n y para los dias habiles de prestamo es necesario especificar un numero entero.", 'Advertencia!!!', {
              timeOut: 5000, positionClass: 'toast-top-center'
            });
            this.router.navigate(['/info-biblioteca']);
          } else {
            const id = 1;
            this.userService.updateInfoBiblioteca(id, this.infoBiblioteca).subscribe(
              data => {
                //si todo va bien
                this.toastr.success('La información de biblioteca se actualizo correctamente!', 'Ok!', {
                  timeOut: 5000, positionClass: 'toast-top-center'
                });
                //recargamos la pantalla, pero podriamos ir a otro lado
                this.router.navigate(['/info-biblioteca']);
              },
              err => {
                //si sucede algun fallo, mostramos el error que envia la api
                this.toastr.error(err.error.mensaje, 'Fail!', {
                  timeOut: 5000, positionClass: 'toast-top-center'
                });
                //recargamos la pantalla, pero podriamos ir a otro lado
                this.router.navigate(['/info-biblioteca']);
              }
            );

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
