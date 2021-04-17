import { Component, ViewChild, OnInit, Input, EventEmitter, Output, NgZone } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Libro } from "../models/libro";
import { LibrosService } from '../service/libros/libros.service';
import { CategoryService } from '../service/category.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users/users.service';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service'
import { AsignacionLibro } from '../models/asignacion_libro';

@Component({
  selector: 'app-ingresoLibro',
  templateUrl: './ingresoLibro.component.html',
  styleUrls: ['./ingresoLibro.component.css']
})


export class IngresoLibroComponent implements OnInit {

  @Input()
  nuevoLibro: Libro;
  @Input()
  categorias: Categoria[];
  @Input()
  categoriasElegidas: Categoria[];

  @Output()
  bookAddedEvent = new EventEmitter();
  private selectedFile;
  imgURL: any;

  displayedColumns: string[] = ['idCategoria', 'nombre'];

  constructor(
    private LibroService: LibrosService,
    private categoryService: CategoryService,
    private userService: UsersService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private zone: NgZone,
    private asignacionLibroService: AsignacionLibroService
  ) { }

  autor: string;
  codigo: string;
  edicion: number;
  fechaPublicacion: string;
  idioma: string;
  nombre: string;
  imagen: string;
  stock: number;
  categoria: any;
  buttonUsers: boolean = false;

  ngOnInit() {
    this.categoryService.lista().subscribe(categoria => this.categorias = categoria);
    this.categoriasElegidas = [];
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
    }
  }

  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
  }

  onCreate(): void {
    const uploadData = new FormData();

    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;
    if(this.categoriasElegidas.length > 0) 
      this.httpClient.post('http://localhost:8082/ingresoLibro/upload', uploadData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.LibroService.save(new Libro(this.autor, this.codigo, this.edicion, this.fechaPublicacion, this.idioma, this.nombre, '', this.stock, this.categoria)).subscribe(
              (book) => {
                this.categoriasElegidas.forEach((categoria) => {
                  this.asignacionLibroService.save(new AsignacionLibro(categoria.idCategoria, book.idLibro)).subscribe()
                })
                this.bookAddedEvent.emit();
                //si todo va bien
                this.toastr.success('El libro se ha registrado!', 'Ok!', {
                  timeOut: 5000, positionClass: 'toast-top-center'
                });
                this.router.navigate(['/listaLibro']);
              }
            );
          }
        }
      );
    else 
      this.toastr.warning('No se colocó ninguna categoria', 'Advertencia', {
        timeOut: 5000, positionClass: 'toast-top-center'
      });
  }

  

  addCategoria(): void {
    if (this.categoriasElegidas.length === 5)
      this.toastr.warning("Solo se permite un máximo de 5 categorias por libro", 'Advertencia!', {
        timeOut: 5000, positionClass: 'toast-top-center'
      });
    else if (!this.categoriasElegidas.includes(this.categoria))
      this.categoriasElegidas.push(this.categoria);
    else
      this.toastr.warning("Esta categoria ya fue ingresada", 'Advertencia!', {
        timeOut: 5000, positionClass: 'toast-top-center'
      });
  }

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }
}






