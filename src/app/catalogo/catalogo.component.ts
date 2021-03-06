import { Component, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

import { UsersService } from "../service/users/users.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  constructor(public userService: UsersService, public router: Router) {}
  
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
  categories = [
    {
      name: 'Matematica',
      books: [
        {
          name: 'Calculo y trigonometria',
          author: 'Sullivan',
          edition: 9,
          available: false
        },
        {
          name: 'PreCálculo',
          author: 'Stewart',
          edition: 7,
          available: false
        },
        {
          name: 'Calculo y trigonometria',
          author: 'Sullivan',
          edition: 12,
          available: true
        },
        {
          name: 'Cálculo I',
          author: 'Larson',
          edition: 9,
          available: false
        },
        {
          name: 'Cálculo II',
          author: 'Larson',
          edition: 9,
          available: true
        },
        {
          name: 'Calculo y trigonometria',
          author: 'Larson',
          edition: 3,
          available: false
        },
      ]
    },
    {
      name: 'Fisica',
      books: [
        {
          name: 'Fisica Vol. 1',
          author: 'Resnik',
          edition: 4,
          available: true
        },
        {
          name: 'Fisica Vol. 2',
          author: 'Resnik',
          edition: 4,
          available: true
        },
        {
          name: 'Fundamentos de Física',
          author: 'Resnik',
          edition: 4,
          available: true
        },
      ]
    },
    {
      name: 'Quimica',
      books: [
        {
          name: 'Ordonecio',
          author: 'Alvaro Ordoñez',
          edition: 2,
          available: false
        },
      ]
    },
  ];
  items = ['First', 'Second', 'Third'];

}
