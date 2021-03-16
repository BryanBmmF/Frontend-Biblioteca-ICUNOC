import { Component, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

import { Router } from '@angular/router';
import { Libro } from "../models/libro";
import { LibrosService } from '../service/libros/libros.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ingresoLibro',
  templateUrl: './ingresoLibro.component.html',
  styleUrls: ['./ingresoLibro.component.css']

})
export class IngresoLibroComponent {
  constructor(
    private LibroService: LibrosService,
    private toastr: ToastrService,
    private router: Router
    ) { }


  inicio(){
    //volvemos a la pantalla de index o la inicial
    this.router.navigateByUrl('/catalogo');
  }


  autor :string;
  codigo :string;
  edicion : number;
  fechaPublicacion :string;
  idioma :string;
  nombre:string;
  imagen :string;
  stock: number ;
  categoria :number;
   
  ngOnInit() {
  }

  onCreate(): void {
    console.log(this.autor);
    console.log(this.codigo);
    console.log(this.edicion);
    console.log(this.fechaPublicacion);
    console.log(this.idioma);
    console.log(this.nombre);
    console.log(this.imagen);
    console.log(this.stock);
    console.log(this.categoria);
    const libro = new Libro(this.autor,this.codigo,this.edicion,this.fechaPublicacion,this.idioma,this.nombre,this.imagen,this.stock,this.categoria);
    this.LibroService.save(libro).subscribe(
      data => {
        this.toastr.success('Libro Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail, no creo nada', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });        
        this.router.navigate(['/']);
      }
    );
  }
}




