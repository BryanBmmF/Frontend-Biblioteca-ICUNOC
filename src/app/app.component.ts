import { Component, ViewChild,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { LibrosService } from 'src/app/service/libros/libros.service';
import {MatAccordion} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {Categoria} from './models/categoria'
import {CategoryService} from './service/category.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  libroModel:Libro;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatListModule) list: MatListModule;
  @ViewChild(MatTableModule) table: MatTableModule;
  title = 'Frontend-Biblioteca-ICUNOC';
  displayedColumns: string[] = ['name', 'author', 'edition', 'available'];
  panelOpenState = false;
  categories: Categoria[] = [];
  constructor(private categoryService: CategoryService, private service:LibrosService, private router:Router) {}
  // ngOnInit() {
  //   this.getCategories()
  // }

  // async getCategories() {
  //   this.categoryService.lista().subscribe(
  //     data => {
  //       this.categories = data;
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   )
  // }
}
