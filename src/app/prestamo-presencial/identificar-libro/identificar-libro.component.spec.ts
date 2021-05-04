import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IdentificarLibroComponent } from './identificar-libro.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { AsignacionLibroService } from '../../service/asignacion_libro/asignacion-libro.service';
import { LibrosService } from '../../service/libros/libros.service';
import { UsersService } from '../../service/users/users.service';
import { Libro } from '../../models/libro';
import { of, throwError } from 'rxjs';
import libros from '../../test/fileTest/libros.json';


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

class MatDialogMock {
  //este es el mock del Dialogo, igual solo se declara porque hay dos escenarios
  //open = jasmine.createSpy('open').and.returnValue({afterClosed: () => of(true)});
  open = jasmine.createSpy('open');
}

describe('IdentificarLibroComponent', () => {
  let component: IdentificarLibroComponent;
  let fixture: ComponentFixture<IdentificarLibroComponent>;
  let libroServiceMock : LibroServiceMock;
  let userServiceMock : UsersServiceMock;
  let toastrMock: ToastrServiceMock;
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
        IdentificarLibroComponent,
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
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
      ]
    })
    component = TestBed.get(IdentificarLibroComponent);
    libroServiceMock = TestBed.get(LibrosService);
    userServiceMock = TestBed.get(UsersService);
    toastrMock = TestBed.get(ToastrService);
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
 
  it('should ngOnInit confirm User Logged Admin|Bibliotecario', () => {
   //Arrage
   userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);
   //de una vez se prueba el metodo validar menu en su rama verdadera
   userServiceMock.getLoggedInUserRoleBibliotecario.and.returnValue(true);
   var reporteList: Libro[] = libros;
   libroServiceMock.lista.and.returnValue(of(reporteList));
   //Act
   component.ngOnInit();
 
   //Expect
   //continue load users
 });
 
  it('should ngOnInit NOT confirm User Logged Admin|Bibliotecario', () => {
   //Arrage
   userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(false);
 
   //Act
   component.ngOnInit();
 
   //Expect
   expect(spyRouter.navigate).toHaveBeenCalledWith(['/']);
 });

  it('should cargarLibrosFiltrados lenght 0', () => {
    //Arrage
    var listaReporte: Libro[] = [];
    libroServiceMock.busquedaFiltrada.and.returnValue(of(listaReporte));
  
    //Act
    component.cargarLibrosFiltrados();
  
    //Spect
    //load users
  });
  
  it('should cargarLibrosFiltrados', () => {
    //Arrage
    var listaReporte: Libro[] = libros;
    libroServiceMock.busquedaFiltrada.and.returnValue(of(listaReporte));
  
    //Act
    component.cargarLibrosFiltrados();
  
    //Spect
    //load users
  });
  
  
  it('should cargarLibrosFiltrados with error', () => {
    //Arrage
    var listaReporte: Libro[] = [];
    libroServiceMock.busquedaFiltrada.and.returnValue(of(listaReporte));
  
    //enviamos un user real
    libroServiceMock.busquedaFiltrada.and.returnValue(throwError({ status: 404, error: "error" }));
  
    //Act
    component.cargarLibrosFiltrados();
  
    //Spect
    //load users
  });

  it('should cargarLibros', () => {
    //Arrage
    var listaReporte: Libro[] = [];
    libroServiceMock.lista.and.returnValue(of(listaReporte));
  
    //Act
    component.cargarLibros();
  
    //Spect
    //load users
  });

  it('should cargarLibros with error', () => {
    //Arrage
    var listaReporte: Libro[] = [];
    libroServiceMock.lista.and.returnValue(of(listaReporte));
  
    //enviamos un user real
    libroServiceMock.lista.and.returnValue(throwError({ status: 404, error: "error" }));
  
    //Act
    component.cargarLibros();
  
    //Spect
    //load users
  });
});
