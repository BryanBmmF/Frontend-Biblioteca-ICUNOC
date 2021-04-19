import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { LibrosService } from '../service/libros/libros.service';
import { UsersService } from '../service/users/users.service';
import { IngresoLibroComponent } from './ingresoLibro.component';
import { of, throwError } from 'rxjs';
import { CategoriaServiceMock } from '../service/category-service-mock';
import { CategoryService } from '../service/category.service';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service';


class LibroServiceMock {
  //estos mocks son del libro
  save = jasmine.createSpy('save');
}

class CategoryServiceMock {
  //estos mocks son del category
  lista = jasmine.createSpy('lista');
}

class UsersServiceMock {
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  getLoggedInUserRoleBibliotecario = jasmine.createSpy('getLoggedInUserRoleBibliotecario');
  getDatosUserLogueado = jasmine.createSpy('getDatosUserLogueado');
  logout = jasmine.createSpy('logout');
}

class ToastrServiceMock {
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

class AsignacionLibroServiceMock {
  //estos mocks son de asignacion libro;
  save = jasmine.createSpy('save');
}


describe('IngresoLibroComponent', () => {
  let component: IngresoLibroComponent;
  let libroServiceMock: LibroServiceMock;
  let categoryServiceMock : CategoryServiceMock;
  let userServiceMock: UsersServiceMock;
  let toastrMock: ToastrServiceMock;
  let asignacionLibroMock: AsignacionLibroServiceMock;

  //el roter spy falso que emula las rutas
  const spyRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //Estos 2 imports casi que van de cajon siempre
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [IngresoLibroComponent],
      //los mock que creamos
      providers: [
        HttpClient,
        IngresoLibroComponent,
        FormsModule,
        {
          provide: LibrosService,
          useClass: LibroServiceMock,
        },
        {
          provide: CategoryService,
          useClass: CategoryServiceMock,
        },
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: ToastrService,
          useClass: ToastrServiceMock,
        },
        {
          provide: AsignacionLibroService,
          useClass: AsignacionLibroServiceMock,
        },
        {
          provide: Router,
          useValue: spyRouter,
        }
      ]
    })
    component = TestBed.get(IngresoLibroComponent);
    libroServiceMock = TestBed.get(LibrosService);
    categoryServiceMock = TestBed.get(CategoryService);
    userServiceMock = TestBed.get(UsersService);
    toastrMock = TestBed.get(ToastrService);
    asignacionLibroMock = TestBed.get(AsignacionLibroService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('should logout', () => {
   //Arrage

   //Act
   component.logout();

   //Spect
   expect(spyRouter.navigateByUrl).toHaveBeenCalledWith('/login');
 });

 it('should validar menu loggedBibliotecario', () => {
   //Arrage
   userServiceMock.getLoggedInUserRoleBibliotecario.and.returnValue(true);

   //Act
   component.validarMenu();

   //Expect
   //continue
 });

});
