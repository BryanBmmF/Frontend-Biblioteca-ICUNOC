import { Component, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { LibrosService } from '../service/libros/libros.service';
import { UsersService } from "../service/users/users.service";
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Categoria } from '../models/categoria';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service';
import { ToastrService } from 'ngx-toastr';
import { Libro } from '../models/libro';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  constructor(
    private libroService: LibrosService,
    public userService: UsersService, 
    private toastr: ToastrService,
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
  filteredBooks: Libro[] = [];
  stringBusqueda: string;
  searchingBooks: boolean;
  step:number = 0;

  setStep(index: number) {
    this.step = index;
  }

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

  cargarLibrosFiltrados(): void {
    this.searchingBooks = true
    this.libroService.busquedaFiltrada(this.stringBusqueda).subscribe(
      data => {
        if (data.length == 0) {
          this.toastr.warning('No se encontró ningún libro. Intenta de nuevo', 'Ups!', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        } else {
          this.filteredBooks = data
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  restoreCategories(): void {
    this.searchingBooks = false
    this.stringBusqueda = ''
  }

  VerDetallesLibro(libro){
    if(libro.stock >0) {
      localStorage.setItem("idLibro", libro.idLibro);
      this.router.navigateByUrl("detalleslibro");
    } else {
      this.toastr.error('Este libro no está disponible', 'Ups!', {
        timeOut: 2000, positionClass: 'toast-top-center'
      });
    }
  }
 
}
