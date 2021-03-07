import { Component, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

import { UsersService } from "../service/users/users.service";
import { Router } from '@angular/router';
import { Libro } from "./libro";
@Component({
  selector: 'app-ingresoLibro',
  templateUrl: './ingresoLibro.component.html',
  styleUrls: ['./ingresoLibro.component.css']

})
export class IngresoLibroComponent {
  constructor(public userService: UsersService, public router: Router) {}
  
  //metodo para salir del sistema
  logout(){
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

  inicio(){
    //volvemos a la pantalla de index o la inicial
    this.router.navigateByUrl('/catalogo');
  }

  libroModel = new Libro("", "", undefined,"","","","","","",undefined);

  ngOnInit() {}

  formularioEnviado(){
    /*
    Aquí el formulario ha sido enviado, ya sea
    por presionar el botón, presionar Enter, etcétera
    */
    console.log("El formulario fue enviado y el libro es: ", this.libroModel)
    confirm("Guardar libro en Data Base?");
  }

  formularioCancelado(){
    /*
    Aquí el formulario ha sido enviado, ya sea
    por presionar el botón, presionar Enter, etcétera
    */
    confirm("Seguro que desea cancelar la operacion?");
  }
}




