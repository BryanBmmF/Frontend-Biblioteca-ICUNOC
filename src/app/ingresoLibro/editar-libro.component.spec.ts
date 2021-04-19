import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, convertToParamMap, Data, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { LibrosService } from '../service/libros/libros.service';
import { UsersService } from '../service/users/users.service';
import { EditarLibroComponent } from './editar-libro.component';
import { of, throwError } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service';

class UsersServiceMock {
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  getLoggedInUserRoleBibliotecario = jasmine.createSpy('getLoggedInUserRoleBibliotecario');
  logout = jasmine.createSpy('logout');
}

class LibroServiceMock {
  //estos mocks son del toastr
  detalleCodigo = jasmine.createSpy('detalleCodigo');
  update = jasmine.createSpy('update');
}

class CategoryServiceMock {
  //estos mocks son del toastr
  lista = jasmine.createSpy('lista');
}

class AsignacionLibroServiceMock {
  //estos mocks son del toastr
  listaCategoria = jasmine.createSpy('listaCategoria');
  deleteAssignations = jasmine.createSpy('deleteAssignations');
  save = jasmine.createSpy('save');
}


class ToastrServiceMock {
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

class MatDialogMock {
  //este es el mock del Dialogo, igual solo se declara porque hay dos escenarios
  //open = jasmine.createSpy('open').and.returnValue({afterClosed: () => of(true)});
  open = jasmine.createSpy('open');
}

describe('EditarLibroComponent', () => {
  let libroServiceMock: LibroServiceMock;
  let categoryServiceMock: CategoryServiceMock;
  let userServiceMock: UsersServiceMock;
  let asignacionLibroServiceMock : AsignacionLibroServiceMock;
  let component: EditarLibroComponent;
  let matDialogMock: MatDialogMock;
  let toastrMock: ToastrServiceMock;

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
      declarations: [EditarLibroComponent],
      //los mock que creamos
      providers: [
        HttpClient,
        EditarLibroComponent,
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: LibrosService,
          useClass: LibroServiceMock,
        },
        {
          provide: AsignacionLibroService,
          useClass: AsignacionLibroServiceMock,
        },
        {
          provide: CategoryService,
          useClass: CategoryServiceMock,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
        {
          provide: ToastrService,
          useClass: ToastrServiceMock,
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: convertToParamMap({ id: '1' }),
            },
            params: {
              subscribe: (fn: (value: Data) => void) => fn({
              }),
            }
          }
        }
      ]
    });
    component = TestBed.get(EditarLibroComponent);
    libroServiceMock = TestBed.get(LibrosService);
    categoryServiceMock = TestBed.get(CategoryService);
    userServiceMock = TestBed.get(UsersService);
    asignacionLibroServiceMock = TestBed.get(AsignacionLibroService);
    matDialogMock = TestBed.get(MatDialog);
    toastrMock = TestBed.get(ToastrService);
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
