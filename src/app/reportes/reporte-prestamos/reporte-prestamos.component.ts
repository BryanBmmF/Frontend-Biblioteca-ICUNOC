import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Prestamo } from 'src/app/models/Prestamo';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-reporte-prestamos',
  templateUrl: './reporte-prestamos.component.html',
  styleUrls: ['./reporte-prestamos.component.css']
})
export class ReportePrestamosComponent implements OnInit {
  prestamos: Prestamo[] = [];
  total: Object[] = [];
  totales: String[]=[];
  buttonUsers: boolean = false;
  constructor(private router:Router
  ,private userService: UsersService
  ,private prestamoService: PrestamosService
  ,private toastr: ToastrService) { }

  ngOnInit(): void {
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
      this.verReporte1();
    }
  }

  translateDate(date:any):any {
    return moment(date).locale('es-mx').format('LL')
  }
  
  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }
  verReporte1(): void {
    this.prestamoService.reporte1().subscribe(
      data => {
        if (data.length == 0) {
          this.toastr.warning('No hay registros! Intente de nuevo', 'Error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        } else {
          this.prestamos = data;
          this.verReporte1Cuota();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  verReporte1Cuota(): void {
    this.prestamoService.reporte1Cuota().subscribe(
      data => {
        if (data.length == 0) {
          this.toastr.warning('No hay registros! Intente de nuevo', 'Error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        } else {
          this.total = data;
          this.valoresR1();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  valoresR1(): void{
    this.totales=this.total[0].toString().split(',',2);
  }

  

  verReporte2(): void {
    this.totales=[];
    this.prestamoService.reporte2().subscribe(
      data => {
        if (data.length == 0) {
          this.toastr.warning('No hay registros! Intente de nuevo', 'Error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        } else {
          this.prestamos = data;
          this.totales[0] = this.prestamos.length.toString();
          this.totales[1] = "0.00";
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  logout(){
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }
}
