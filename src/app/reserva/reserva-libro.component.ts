import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { Prestamo } from "../models/Prestamo";
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reserva-libro',
  templateUrl: './reserva-libro.component.html',
  styleUrls: ['./reserva-libro.component.css']
})
export class ReservaLibroComponent implements OnInit {

  prestamoDetalles:Prestamo;
  codigoReservacionVar:string;
  
  constructor(
    private prestamosService: PrestamosService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let codigoRecivido = localStorage.getItem("codigoReservacion");
    this.codigoReservacionVar = codigoRecivido;
  }

  generarPDF(){
    const id = this.activatedRoute.snapshot.params.id;
    this.prestamosService.detail(this.codigoReservacionVar).subscribe(
      data => {
        this.prestamoDetalles = data;
        console.log(this.prestamoDetalles)
        var doc = new jsPDF();
        doc.rect(10, 10, 190, 110)
        var imgData = 'https://th.bing.com/th/id/R357b881f7404a7510172712ba8df9b7a?rik=1F6J6d8A%2bhOR5g&riu=http%3a%2f%2fcceeusac.com%2fasignaciones%2fImagenes%2flogo_usac.png&ehk=KplsqbdMJu2aTx%2bzT5h2DGcFKOP5faojo95W%2bTVxoPM%3d&risl=&pid=ImgRaw';
        doc.addImage(imgData, 'JPEG', 130, 30, 65, 65);
        doc.setFontSize(19)
        doc.text('Ficha de Reservacion - Biblioteca Ingenieria', 45, 23)
        doc.setFontSize(14)  
        doc.text('Nombre: '+this.prestamoDetalles.nombre,30, 35);
        doc.text('Apellido: '+this.prestamoDetalles.apellido,30, 45);
        doc.text('DPI: '+this.prestamoDetalles.dpi,30, 55);
        doc.text('Carnet: '+this.prestamoDetalles.carnet,30, 65);
        doc.text('Carrera: '+this.prestamoDetalles.carrera,30, 75);
        doc.text('Estado de reservación: '+this.prestamoDetalles.estado,30, 85);
        doc.text('Codigo de Reservacion: '+this.prestamoDetalles.codigoReservacion,30, 95);
        doc.text('Codigo del Libro: '+this.prestamoDetalles.codigoLibro,30, 105); 
        doc.setFontSize(9)  
        doc.text('*Recuerda presentar al menos un documento de identificación para poder recibir el libro en biblioteca.*',35, 118);
        doc.save(this.prestamoDetalles.nombre+'_Reservacion_'+this.codigoReservacionVar+'.pdf');
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );  
  }

}
