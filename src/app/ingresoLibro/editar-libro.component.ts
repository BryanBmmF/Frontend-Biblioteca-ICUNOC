import { Component, ViewChild, OnInit, Input, EventEmitter, Output, NgZone } from '@angular/core';
import { Libro } from '../models/libro';
import { LibrosService } from '../service/libros/libros.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users/users.service';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { CategoryService } from '../service/category.service';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service';
import { AsignacionLibro } from '../models/asignacion_libro';
@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit {

  @Input()
  categoriasElegidas: Categoria[];

  libro: Libro = null;
  buttonUsers: boolean = false;
  categorias: Categoria[];
  categoriaElegida: Categoria = null;
  categoria: any;

  @Output()
  bookAddedEvent = new EventEmitter();
  private selectedFile;
  imgURL: any;

  constructor(
    private libroService: LibrosService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private httpClient: HttpClient,
    private asignacionLibroService: AsignacionLibroService,
  ) { }

  ngOnInit() {
    this.categoryService.lista().subscribe(categoria => this.categorias = categoria);
    //comprobar sesion
    if (!(this.userService.getLoggedInUserRoleAdmin() || this.userService.getLoggedInUserRoleBibliotecario())) {
      this.router.navigate(['/']);
    } else {
      /* Codigo que se quiera cargar al inicio */
      this.validarMenu();
      const id = this.activatedRoute.snapshot.params.id;
      this.libroService.detalle(id).subscribe(
        data => {
          this.libro = data;
          this.imgURL = 'data:image/jpeg;base64,' + this.libro.pathImagen;
          this.asignacionLibroService.listaCategorias(this.libro.idLibro).subscribe(
            data => {
              this.categoriasElegidas = data
            }
          )
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/listaLibro']);
        }
      );
    }

  }

  validarMenu() {
    if (this.userService.getLoggedInUserRoleBibliotecario()) {
      this.buttonUsers = !this.buttonUsers;
    }
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

  erase(categoria): void {
    const index = this.categoriasElegidas.indexOf(categoria)
    console.log(index)
    this.categoriasElegidas.splice(index, 1)
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    const uploadData = new FormData();
    if(this.categoriasElegidas.length > 0)
      if (this.selectedFile === undefined) {
        this.libroService.update(id, this.libro).subscribe(
          data => {
            this.asignacionLibroService.deleteAssignations(this.libro.idLibro).subscribe()
            this.categoriasElegidas.forEach((categoria) => {
              this.asignacionLibroService.save(new AsignacionLibro(categoria.idCategoria, this.libro.idLibro)).subscribe()
            })
            this.toastr.success('Libro Actualizado', 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.router.navigate(['/listaLibro']);
          },
          err => {
            this.toastr.error(err.error.mensaje, 'Fail', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
            this.router.navigate(['/listaLibro']);
          }
        );
      } else {
        uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
        this.selectedFile.imageName = this.selectedFile.name;
        this.httpClient.post('http://localhost:8082/ingresoLibro/upload', uploadData, { observe: 'response' })
          .subscribe((response) => {
            if (response.status === 200) {
              //---
              this.libroService.update(id, this.libro).subscribe(
                data => {
                  this.asignacionLibroService.deleteAssignations(this.libro.idLibro).subscribe()
                  this.categoriasElegidas.forEach((categoria) => {
                    this.asignacionLibroService.save(new AsignacionLibro(categoria.idCategoria, this.libro.idLibro)).subscribe()
                  })
                  this.toastr.success('Libro Actualizado', 'OK', {
                    timeOut: 3000, positionClass: 'toast-top-center'
                  });
                  this.router.navigate(['/listaLibro']);
                },
                err => {
                  this.toastr.error(err.error.mensaje, 'Fail', {
                    timeOut: 3000, positionClass: 'toast-top-center',
                  });
                  this.router.navigate(['/listaLibro']);
                }
              );
              //---
            }
          }
          );
      }
    else 
      this.toastr.warning('No se colocó ninguna categoria', 'Advertencia', {
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
    //borramos el token de las cookies
    this.userService.logout();
    //volvemos a la pantalla de login o la inicial
    this.router.navigateByUrl('/login');
  }

}
