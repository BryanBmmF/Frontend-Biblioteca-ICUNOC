import { Component, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

import { UsersService } from "../service/users/users.service";
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Categoria } from '../models/categoria';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  constructor(
    public userService: UsersService, 
    public router: Router, 
    private categoryService: CategoryService,
    private asignacionLibroService: AsignacionLibroService) {}
  
  //metodo para salir del sistema
  logout(){
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatListModule) list: MatListModule;
  @ViewChild(MatTableModule) table: MatTableModule;
  title = 'Frontend-Biblioteca-ICUNOC';
  displayedColumns: string[] = ['name', 'author', 'edition', 'available'];
  panelOpenState = false;
  categories: Categoria[] = [];

  ngOnInit() {
    this.getCategories()
  }

  async getCategories() {
    this.categoryService.lista().subscribe(
      data => {
        this.categories = data;
        this.categories.forEach(category => {
          this.asignacionLibroService.listaLibrosCategoria(category.idCategoria).subscribe(
            data => {
              category.libros = data
            }
          )
        });
      },
      err => {
        console.log(err)
      }
    )
  }

  VerDetallesLibro(libroID){
    //console.log(libroID.idLibro);
    localStorage.setItem("idLibro", libroID.idLibro);
    this.router.navigate(["detalleslibro"]);
  }
 
}
