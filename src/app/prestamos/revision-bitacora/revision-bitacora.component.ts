import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Prestamo } from 'src/app/models/Prestamo';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-revision-bitacora',
  templateUrl: './revision-bitacora.component.html',
  styleUrls: ['./revision-bitacora.component.css']
})
export class RevisionBitacoraComponent implements OnInit {

  prestamos: Prestamo[] = [];
  constructor(
    private prestamoService: PrestamosService,
    private toastr: ToastrService,
    public dialogo: MatDialog) { }

  stringBusqueda: string;
  ngOnInit(): void {
    
  }

  translateDate(date:any):any {
    return moment(date).locale('es-mx').format('LL')
  }

  cargarPrestamosFiltrados(): void {
    this.prestamoService.busquedaBitacora(this.stringBusqueda).subscribe(
      data => {
        if (data.length == 0) {
          this.toastr.warning('No se encontró ningun registro asociado al carnet o dpi especificado. Intenta de nuevo', 'Ups!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        } else {
          this.prestamos = data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  limpiar(): void {
    this.prestamos = [];
   
  }

}
