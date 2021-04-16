import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router:Router
  ,private userService: UsersService
  ,private prestamoService: PrestamosService
  ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.verReporte1();
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

  verReporte3(): void {
    this.totales=[];
    this.prestamos=[];
    this.prestamoService.reporte3().subscribe(
      data => {
        if (data.length == 0) {
          this.toastr.warning('No hay registros! Intente de nuevo', 'Error!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        } else {
          this.total = data;
          this.valoresR3();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  valoresR3(): void{
    this.totales=this.total[0].toString().split(',',7);
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTable");
    for(let i=0; i<this.totales.length;i++){
      var row = table.insertRow(i);
    }
  }
  logout(){
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }
}
