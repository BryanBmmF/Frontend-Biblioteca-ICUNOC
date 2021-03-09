import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { LibrosService } from 'src/app/service/libros/libros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  libroModel:Libro;
  title:string = 'Titulo';

  constructor(private service:LibrosService, private router:Router) { }

  ngOnInit(): void {
  }

  MostrarDatosLibro(libro:Libro):void{
    localStorage.setItem("idLibro", "1");
    this.router.navigate(["detalleslibro"]);
  }
}