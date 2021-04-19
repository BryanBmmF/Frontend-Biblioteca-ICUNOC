import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailBody } from 'src/app/models/EmailBody';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-solicitud-reset-password',
  templateUrl: './solicitud-reset-password.component.html',
  styleUrls: ['./solicitud-reset-password.component.css']
})
export class SolicitudResetPasswordComponent implements OnInit {
  buttonUsers: boolean = false;

  URL_RESET_PASSWORD = "http://localhost:4200/reset-password";
  email: string;
  content: string;
  subject: string;

  constructor(public userService: UsersService, public router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
    }
  }
  
  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

  enviarSolicitud(){
    this.email = this.userService.getDatosUserLogueado().correo;
    this.content = "Para poder cambiar su contraseña siga los siguientes pasos:"+"<br/>"+
                    " 1. Ingrese al siguiente link desde su navegador web:"+this.URL_RESET_PASSWORD+" .<br/>"+
                    " 2. Llene los datos que se le solicitan para cambiar su contraseña. "+"<br/>"+
                    " 3. Compruebe que sus datos son correctos y procese su solicitud. "+"<br/><br/>"+
                    "Nota: Si usted no envio la solicitud para recibir este correo, porfavor ignorelo y revise que nadie mas tenga acceso a su perfil por medio de sus credenciales registradas.";

    this.subject = "Sistema de Biblioteca Ingenieria CUNOC";
    const emailBody = new EmailBody(this.email, this.content, this.subject);

    //espera....
    this.toastr.info('Porfavor espere un momento...!', 'Info!', {
      timeOut: 7000, positionClass: 'toast-top-center'
    });
    

    this.userService.sendEmail(emailBody).subscribe(
      data => {
        //si todo va bien
        this.toastr.success('La solicitud se envio correctamente, porfavor revise su correo electronico!', 'Ok!', {
          timeOut: 5000, positionClass: 'toast-top-center'
        });
        //recargamos la pantalla, pero podriamos ir a otro lado
        this.router.navigate(['/solicitud-reset-password']);

      },
      err => {
        //si sucede algun fallo, mostramos el error que envia la api
        this.toastr.error(err.error.mensaje, 'Fail!', {
          timeOut: 5000, positionClass: 'toast-top-center'
        });
        //recargamos la pantalla, pero podriamos ir a otro lado
        //form.reset();
        this.router.navigate(['/solicitud-reset-password']);
      }
    );
  }

  

}
