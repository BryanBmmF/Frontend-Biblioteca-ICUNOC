import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { LibrosService } from 'src/app/service/libros/libros.service';
import { Prestamo } from '../models/Prestamo';
import { UsersService } from '../service/users/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prestamo-libro',
  templateUrl: './prestamo-libro.component.html',
  styleUrls: ['./prestamo-libro.component.css']
})

export class PrestamoLibroComponent implements OnInit {

  libroRecivido: Libro;
  libroVerificacion: Libro;
  codigoVar:string;
  nombreVar:string;
  idLibroVar:string;
  codigoReservacionVar:string;
  nuevoStock:number;

  constructor(private router:Router, 
    private prestamoService:PrestamosService, 
    private librosService:LibrosService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UsersService) { }

  nombre:string;
  apellido:string;
  DPI:string;
  carnet:string;
  carrera:string;

  ngOnInit(): void {
    this.obtenerDatos();
  }

async generarReservacion() {
      this.librosService.getLibroId(this.idLibroVar)
      .subscribe(data=>{
      this.libroVerificacion=data;
      //Verificamos en el momento de presionar el boton que exista stock suficiente del libro a reservar
      if(this.libroVerificacion.stock >= 1){
        this.nuevoStock = this.libroVerificacion.stock -1;
        console.log("El nuevo stock es: "+this.nuevoStock);
        this.libroVerificacion.stock = this.nuevoStock;
        console.log(this.libroVerificacion);
          if (confirm("¿Esta seguro de reservar este libro?")) {
          const nuevoPrestamo = new Prestamo(this.nombre, this.apellido, this.DPI, this.carnet,this.carrera,'','','',0,'RESERVADO',this.codigoReservacionVar,this.codigoVar);
          this.prestamoService.save(nuevoPrestamo).subscribe(
            data => {
              this.toastr.success('Reservación Registrada', 'Ok!', {
                timeOut: 5000, positionClass: 'toast-top-center'
              });
              //En este punto actualizamos el stock del libro reservado
              this.librosService.update(this.libroVerificacion.idLibro, this.libroVerificacion).subscribe(
                data => {
                });
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
  confirmarBoletaReservación(codigoReservacion){
    localStorage.setItem("codigoReservacion", codigoReservacion);
    this.router.navigate(["reservacionConfirmada"]);
  }

  obtenerDatos(){
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

  logout(){
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }
}
