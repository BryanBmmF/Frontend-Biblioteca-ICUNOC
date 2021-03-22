import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/libro';
import { LibrosService } from '../service/libros/libros.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-libro',
  templateUrl: './lista-libro.component.html',
  styleUrls: ['./lista-libro.component.css']
})
export class ListaLibroComponent implements OnInit {

  libros: Libro[] = [];

  constructor(
    private libroService: LibrosService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.lista().subscribe(
      data => {
        this.libros = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    if (confirm("¿Esta seguro de eliminar permanentemente este libro?")) {
      this.libroService.delete(id).subscribe(
        data => {
          console.log(id);  
          //lanzamos el mensaje de eliminacion y cargamos la tabla
          this.toastr.info('El libro se elimino correctamente!', 'Ok!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
          this.cargarLibros();
        },
        err => {
          console.log(id);
          //si sucede algun fallo, mostramos el error que envia la api
          this.toastr.error(err.error.mensaje, 'Fail!', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });
        }
      );
    }

  }
}
