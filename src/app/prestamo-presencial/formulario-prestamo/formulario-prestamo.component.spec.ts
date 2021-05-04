import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormularioPrestamoComponent } from './formulario-prestamo.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { LibrosService } from '../../service/libros/libros.service';
import { UsersService } from '../../service/users/users.service';
import { Libro } from '../../models/libro';
import { of, throwError } from 'rxjs';
import libros from '../../test/fileTest/libros.json';
import libroSinExistencia from '../../test/fileTest/libroSinExistencia.json';
import libro from '../../test/fileTest/libro.json';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { ActivatedRoute } from '@angular/router';
import prestamo from '../../test/fileTest/prestamo.json';

class LibroServiceMock {
  detalleCodigo = jasmine.createSpy('detalleCodigo');
  update = jasmine.createSpy('update');
}

class UsersServiceMock {
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  getLoggedInUserRoleBibliotecario = jasmine.createSpy('getLoggedInUserRoleBibliotecario');
  logout = jasmine.createSpy('logout');
}

class PrestamoServiceMock {
  consultarPrestamosReservacionesActivas = jasmine.createSpy('consultarPrestamosReservacionesActivas');
  crearPrestamo = jasmine.createSpy('crearPrestamo');
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

describe('FormularioPrestamoComponent', () => {
  let component: FormularioPrestamoComponent;
  let librosServiceMock : LibroServiceMock;
  let userServiceMock : UsersServiceMock;
  let toastrMock: ToastrServiceMock;
  let matDialogMock: MatDialogMock;
  let prestamoServiceMock: PrestamoServiceMock;

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
        FormularioPrestamoComponent,
        {
          provide: LibrosService,
          useClass: LibroServiceMock,
        },
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: PrestamosService,
          useClass: PrestamoServiceMock,
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
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {codigo: '067662'}}
          }
        }
      ]
      
    })
    component = TestBed.get(FormularioPrestamoComponent);
    librosServiceMock = TestBed.get(LibrosService);
    userServiceMock = TestBed.get(UsersService);
    prestamoServiceMock = TestBed.get(PrestamosService);
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

it('should resetearBusqueda', () => {
  //Arrage
  //Act
  component.resetearBusqueda();

  //Expect
});

it('should generarReservacion', () => {
  //Arrage
  var cantidad: number = 1;
  prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));

  var libroMock: Libro = libro;
  librosServiceMock.detalleCodigo.and.returnValue(of(libro));

  matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 
  prestamoServiceMock.crearPrestamo.and.returnValue(of(prestamo));
  librosServiceMock.update.and.returnValue(of(libro));

  //Act
  component.generarReservacion();
  //Expect
});

it('should generarReservacion Sin Existencias', () => {
  //Arrage
  var cantidad: number = 1;
  prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));
  librosServiceMock.detalleCodigo.and.returnValue(of(libroSinExistencia));
  //Act
  component.generarReservacion();
  //Expect
});

it('should generarReservacion Mas de 2 activos', () => {
  //Arrage
  var cantidad: number = 2;
  prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));
  //Act
  component.generarReservacion();
  //Expect
});

it('should generarReservacion  error En Save Prestamo', () => {
  //Arrage
  var cantidad: number = 1;
  prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));

  var libroMock: Libro = libro;
  librosServiceMock.detalleCodigo.and.returnValue(of(libro));

  matDialogMock.open.and.returnValue({afterClosed: () => of(true)}); 
  prestamoServiceMock.crearPrestamo.and.returnValue(throwError({ status: 404 , error: "error" }));
  librosServiceMock.update.and.returnValue(of(libro));

  //Act
  component.generarReservacion();

  //Expect
});

it('should verificarID', () => {
  //Arrage
  var cantidad: number = 1;
  prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));
  librosServiceMock.detalleCodigo.and.returnValue(of(libro));
  //Act
  component.verificarID();
  //Expect
});

it('should verificarID when DPI undefined and Carnet with Value', () => {
  //Arrage
  var cantidad: number = 1;
  component.DPI = undefined;
  component.carnet = '201631722';
  prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));
  librosServiceMock.detalleCodigo.and.returnValue(of(libro));
  //Act
  component.verificarID();
  //Expect
});

it('should verificarID when Carnet undefined and DPI with Value', () => {
  //Arrage
  var cantidad: number = 1;
  component.DPI = "2222222222222";
  component.carnet = undefined;
  prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));
  librosServiceMock.detalleCodigo.and.returnValue(of(libro));
  //Act
  component.verificarID();
  //Expect
});

it('should verificarID when user have more than 2 reservations', () => {
  //Arrage
  var cantidad: number = 3;
  component.DPI = "2222222222222";
  component.carnet = undefined;
  prestamoServiceMock.consultarPrestamosReservacionesActivas.and.returnValue(of(cantidad));
  librosServiceMock.detalleCodigo.and.returnValue(of(libro));
  //Act
  component.verificarID();
  //Expect
});

});
