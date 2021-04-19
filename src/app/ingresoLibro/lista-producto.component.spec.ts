import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { AsignacionLibroService } from '../service/asignacion_libro/asignacion-libro.service';
import { LibrosService } from '../service/libros/libros.service';
import { UsersService } from '../service/users/users.service';

import { ListaLibroComponent } from './lista-libro.component';

class LibroServiceMock {
  lista = jasmine.createSpy('lista');
  delete = jasmine.createSpy('delete');
  busquedaFiltrada = jasmine.createSpy('busquedaFiltrada');
}

class UsersServiceMock {
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  getLoggedInUserRoleBibliotecario = jasmine.createSpy('getLoggedInUserRoleBibliotecario');
  logout = jasmine.createSpy('logout');
}

class ToastrServiceMock {
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

class AsignacionLibroServiceMock {
  deleteAssignations = jasmine.createSpy('deleteAssignations');
}

class MatDialogMock {
  //este es el mock del Dialogo, igual solo se declara porque hay dos escenarios
  //open = jasmine.createSpy('open').and.returnValue({afterClosed: () => of(true)});
  open = jasmine.createSpy('open');
}


describe('ListaLibroComponent', () => {
  let component: ListaLibroComponent;
  let libroServiceMock : LibroServiceMock;
  let userServiceMock : UsersServiceMock;
  let toastrMock: ToastrServiceMock;
  let asignacionLibroServiceMock : AsignacionLibroServiceMock;
  let matDialogMock: MatDialogMock;

  //el roter spy falso que emula las rutas
  const spyRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  }; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //Estos 2 imports casi que van de cajon siempre
        HttpClientModule,
        RouterTestingModule
      ],
      //los mock que creamos
      providers: [
        HttpClient,
        ListaLibroComponent,
        {
          provide: LibrosService,
          useClass: LibroServiceMock,
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
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
      ]
    })
    component = TestBed.get(ListaLibroComponent);
    libroServiceMock = TestBed.get(LibrosService);
    userServiceMock = TestBed.get(UsersService);
    toastrMock = TestBed.get(ToastrService);
    asignacionLibroServiceMock = TestBed.get(AsignacionLibroService);
    matDialogMock = TestBed.get(MatDialog);
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
