import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Categoria } from '../models/categoria';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  categories: Categoria[] = [];
  searchingBooks: boolean;

  constructor(public router: Router,
    private categoryService: CategoryService,
    private asignacionLibroService: AsignacionLibroService) { }

  ngOnInit(): void {
    this.categoryService.lista().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err)
      }
    )
  }

}
