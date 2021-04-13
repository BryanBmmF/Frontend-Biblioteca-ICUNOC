import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { LibrosService } from 'src/app/service/libros/libros.service';
import { Prestamo } from '../models/Prestamo';
import { UsersService } from '../service/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { EmailBody } from '../models/EmailBody';
import { InfoBiblioteca } from '../models/InfoBiblioteca';

@Component({
  selector: 'app-prestamo-libro',
  templateUrl: './prestamo-libro.component.html',
  styleUrls: ['./prestamo-libro.component.css']
})

export class PrestamoLibroComponent implements OnInit {

  libroRecivido: Libro;
  libroVerificacion: Libro;
  codigoVar: string;
  nombreVar: string;
  idLibroVar: string;
  codigoReservacionVar: string;
  nuevoStock: number;

  //variables para envio de correo
  email: string;
  content: string;
  subject: string;

  infoBiblioteca: InfoBiblioteca = null;

  constructor(private router: Router,
    private prestamoService: PrestamosService,
    private librosService: LibrosService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UsersService) { }

  nombre: string;
  apellido: string;
  DPI: string;
  carnet: string;
  carrera: string;
  correo: string;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  async generarReservacion() {
    this.librosService.detalle(Number(this.idLibroVar))
      .subscribe(data => {
        this.libroVerificacion = data;
        //Verificamos en el momento de presionar el boton que exista stock suficiente del libro a reservar
        if (this.libroVerificacion.stock >= 1) {
          this.nuevoStock = this.libroVerificacion.stock - 1;
          this.libroVerificacion.stock = this.nuevoStock;
          if (confirm("¿Esta seguro de reservar este libro?")) {
            const nuevoPrestamo = new Prestamo(this.nombre, this.apellido, this.DPI, this.carnet, this.carrera, '', '', '', 0, 'RESERVADO', this.codigoReservacionVar, false, 0, this.codigoVar);
            this.prestamoService.save(nuevoPrestamo).subscribe(
              data => {
                this.toastr.success('Reservación Registrada', 'Ok!', {
                  timeOut: 5000, positionClass: 'toast-top-center'
                });
                //En este punto actualizamos el stock del libro reservado
                this.librosService.update(this.libroVerificacion.idLibro, this.libroVerificacion).subscribe(
                  data => {
                  });
                //se envia el correo de confirmacion y se redirige a la vista para generar la boleta
                this.enviarCorreoConfirmacion();
                this.confirmarBoletaReservación(this.codigoReservacionVar);
              },
              err => {
                this.toastr.error(err.error.mensaje, 'Hubo un Error!', {
                  timeOut: 5000, positionClass: 'toast-top-center'
                });
                this.router.navigate(['/']);
              }
            );
          }
        }
        //Si no hay suficientes libros emitimos una alerta al usuario.
        else {
          this.toastr.error('Este libro ya no cuenta con existencias para reservar.', 'Ups!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
        }
      })
  }

  //Metodo para confirmar que la reservación fue realizada y redirigimos a la pagina para descarga de pdf
  confirmarBoletaReservación(codigoReservacion) {
    localStorage.setItem("codigoReservacion", codigoReservacion);
    this.router.navigate(["reservacionConfirmada"]);
  }

  obtenerDatos() {
    let libroRcodigo = localStorage.getItem("codigoLibro");
    let libroRnombre = localStorage.getItem("nombreLibro");
    let libroRid = localStorage.getItem("idLibro");
    this.nombreVar = libroRnombre;
    this.codigoVar = libroRcodigo;
    this.idLibroVar = libroRid;
    this.codigoReservacionVar = this.generaCodigoReserva();
  }

  //metodo para generar el codigo aleatorio, falta llamarlo donde corresponde
  generaCodigoReserva() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  //enviar correo de confirmacion de la resrevacón
  enviarCorreoConfirmacion() {
    //consultar datos de biblioteca
    const id = 1;
    this.userService.detailIdInfoBiblioteca(id).subscribe(
      data => {
        this.infoBiblioteca = data;

        this.email = this.correo;
        this.content = "Tu solicitud de reservación de libro se procesó correctamente con los siguientes datos:" + "<br/><br/>" +
          " Libro a prestar: " + this.nombreVar + "<br/>" +
          " Codigo de Libro: " + this.codigoVar + "<br/><br/>" +
          " Codigo de la Reservación: " + this.codigoReservacionVar + "<br/><br/>" +
          "Horario de atención de la biblioteca: " + this.infoBiblioteca.horario + "<br/>" +
          "Correo electronico para consultas: " + this.infoBiblioteca.correo + "<br/>" +
          "Telefono: " + this.infoBiblioteca.telefono + "<br/>" +
          "Dirección: " + this.infoBiblioteca.direccion + "<br/>" +
          "** Nota: Recuerda presentar al menos un documento de identifiación para poder recibir el libro en biblioteca";

        this.subject = "Sistema de Biblioteca Ingenieria CUNOC";
        const emailBody = new EmailBody(this.email, this.content, this.subject);

        //espera....
        this.toastr.info('Porfavor espere un momento mientras se envia el correo de confirmación...!', 'Info!', {
          timeOut: 5000, positionClass: 'toast-top-center'
        });

        //envio de email
        this.userService.sendEmail(emailBody).subscribe(
          data => {
            //si todo va bien
            this.toastr.success('Los datos de su reservación se enviaron correctamente, porfavor revise su correo electronico!', 'Ok!', {
              timeOut: 5000, positionClass: 'toast-top-center'
            });

          },
          err => {
            //si sucede algun fallo, mostramos el error que envia la api
            this.toastr.error(err.error.mensaje, 'Fail!', {
              timeOut: 5000, positionClass: 'toast-top-center'
            });

          }
        );
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
