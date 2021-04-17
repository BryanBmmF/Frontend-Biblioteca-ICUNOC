import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Prestamo } from 'src/app/models/Prestamo';
import { Reporte3 } from 'src/app/models/reporte3';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-reporte-alumnos-morosos',
  templateUrl: 'reporte-alumnos-morosos.component.html',
  styleUrls: ['./reporte-alumnos-morosos.component.css']
})
export class ReporteAlumnosMorososComponent implements OnInit {
  prestamos: Prestamo[] = [];
  total: Object[] = [];
  totales: String[]=[];
  reporte3: Reporte3[]=[];
  constructor(private router:Router
    ,private userService: UsersService
    ,private prestamoService: PrestamosService
    ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.verReporte3();
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
    console.log(this.total.length);
    for(let i=0;i<this.total.length;i++){
      this.totales=this.total[i].toString().split(',',7);
      if (this.totales.length==7){
       this.reporte3[i] = new Reporte3(this.totales[0],this.totales[1],this.totales[2],this.totales[3],this.totales[4],this.totales[5],this.totales[6]);
      }
    }
  }

  logout(){
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }
}
