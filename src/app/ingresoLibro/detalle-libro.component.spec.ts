import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLibroComponent } from './detalle-libro.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap, Data, Router } from '@angular/router';
import { UsersService } from '../service/users/users.service';
import { Libro } from '../models/libro';
import { LibrosService } from '../service/libros/libros.service';
import { ToastrService } from 'ngx-toastr';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service';

class LibroServiceMock{
  detalleCodigo = jasmine.createSpy('detalleCodigo');
}

class ToastrServiceMock {
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

class UsersServiceMock{
  //Mockeo los metodos que necesite en el component y que en teoria me va proveer el UserService
  //solo los que necesito
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  getLoggedInUserRoleBibliotecario = jasmine.createSpy('getLoggedInUserRoleBibliotecario');
  logout = jasmine.createSpy('logout');
}

class AsignacionLibroServiceMock {
  //estos mocks son del toastr
  listaCategoria = jasmine.createSpy('listaCategoria');
}

describe('DetalleLibroComponent', () => {
  let component: DetalleLibroComponent;
  let libroServiceMock: LibroServiceMock;
  let toastrMock: ToastrServiceMock;
  let userServiceMock: UsersServiceMock;
  let asignacionLibroServiceMock : AsignacionLibroServiceMock;

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
      declarations: [ DetalleLibroComponent ],

      //los mock que creamos
      providers: [
        HttpClient,
        DetalleLibroComponent,
        {
          provide: LibrosService,
          useValue: LibroServiceMock,
        },
        {
          provide: ToastrService,
          useClass: ToastrServiceMock,
        },
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: AsignacionLibroService,
          useClass: AsignacionLibroServiceMock,
        },
        {
          provide: Router,
          useValue: spyRouter,
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
    component = TestBed.get(DetalleLibroComponent);
    libroServiceMock = TestBed.get(LibrosService);
    toastrMock = TestBed.get(ToastrService);
    userServiceMock = TestBed.get(UsersService);
    asignacionLibroServiceMock = TestBed.get(AsignacionLibroService);
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
