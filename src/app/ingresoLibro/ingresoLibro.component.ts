import { Component, ViewChild, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

import { Router, ActivatedRoute } from '@angular/router';
import { Libro } from "../models/libro";
import { LibrosService } from '../service/libros/libros.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users/users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ingresoLibro',
  templateUrl: './ingresoLibro.component.html',
  styleUrls: ['./ingresoLibro.component.css']
})

export class IngresoLibroComponent implements OnInit {

  @Input()
  nuevoLibro: Libro;

  @Output()
  bookAddedEvent = new EventEmitter();
  private selectedFile;
  imgURL: any;

  constructor(
    private LibroService: LibrosService,
    private userService: UsersService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
    ) { }

    autor :string;
    codigo :string;
    edicion : number;
    fechaPublicacion :string;
    idioma :string;
    nombre:string;
    imagen :string;
    stock: number ;
    categoria :number;
    buttonUsers: boolean = false;
  ngOnInit() {
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

    this.httpClient.post('http://localhost:8082/ingresoLibro/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.LibroService.save(new Libro(this.autor,this.codigo,this.edicion,this.fechaPublicacion,this.idioma,this.nombre,'',this.stock,this.categoria)).subscribe(
            (book) => {
              this.bookAddedEvent.emit();
              this.router.navigate(['/ingresoLibro']);
            }
          );
          console.log('Image uploaded successfully');
        } else {
          console.log('Image not uploaded successfully');
        }
      }
      );
  }
  
  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
    console.log('Se ejecuto ese metodo');
    console.log(this.imgURL);
  }

  inicio(){
    //volvemos a la pantalla de index o la inicial
    /*SE TENDRIA QUE VOLVER AL LISTADO DE LIBROS REGISTRADOS NO AL CATALOGO */
    //this.router.navigateByUrl('/catalogo');
  }

  logout() {
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }
}






