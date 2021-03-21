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
  
  constructor(
    private prestamosService: PrestamosService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  generarPDF(codigo:string){
    const id = this.activatedRoute.snapshot.params.id;
    this.prestamosService.detail(codigo).subscribe(
      data => {
        this.prestamoDetalles = data;
        console.log(this.prestamoDetalles = data);
        var doc = new jsPDF();
        doc.rect(15, 2, 190, 110)
        var imgData = 'https://th.bing.com/th/id/R357b881f7404a7510172712ba8df9b7a?rik=1F6J6d8A%2bhOR5g&riu=http%3a%2f%2fcceeusac.com%2fasignaciones%2fImagenes%2flogo_usac.png&ehk=KplsqbdMJu2aTx%2bzT5h2DGcFKOP5faojo95W%2bTVxoPM%3d&risl=&pid=ImgRaw';
        doc.addImage(imgData, 'JPEG', 140, 10, 65, 65);
        doc.setFontSize(19)
        doc.text('FICHA DE RESERVACION - Biblioteca Ingenieria', 20, 10)
        doc.setFontSize(16)
        doc.text('Nombre: '+this.prestamoDetalles.nombre,20, 20);
        doc.text('Apellido: '+this.prestamoDetalles.apellido,20, 30);
        doc.text('DPI: '+this.prestamoDetalles.DPI,20, 40);
        doc.text('Carnet: '+this.prestamoDetalles.carnet,20, 50);
        doc.text('Carrera: '+this.prestamoDetalles.carrera,20, 60);
        doc.text('Fecha Inicio: '+this.prestamoDetalles.fechaInicio,20, 70);
        doc.text('Fecha Fin: '+this.prestamoDetalles.fechaFin,20, 80);
        doc.text('Costo: Q. '+this.prestamoDetalles.costo,20, 90);
        doc.text('Codigo de Reservacion: '+this.prestamoDetalles.codigoReservacion,20, 100);
        doc.text('Codigo del Libro: '+this.prestamoDetalles.codigoLibro,20, 110);
        doc.save('reservacionIngCunoc.pdf');
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );  
  }
  

}
