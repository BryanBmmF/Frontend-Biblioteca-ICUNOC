import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Prestamo } from 'src/app/models/Prestamo';
import { PrestamosService } from 'src/app/service/prestamos/prestamos.service';
import { UsersService } from 'src/app/service/users/users.service';
import reporte3 from '../../test/fileTest/reporte3.json';
import reporte3Vacio from '../../test/fileTest/reporte3Vacio.json';

import { ReporteAlumnosMorososComponent } from './reporte-alumnos-morosos.component';

class UsersServiceMock {
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  getLoggedInUserRoleBibliotecario = jasmine.createSpy('getLoggedInUserRoleBibliotecario');
  logout = jasmine.createSpy('logout');
}

class PrestamosServiceMock{
  reporte3 = jasmine.createSpy('reporte3');
}

class ToastrServiceMock {
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}


describe('ReporteAlumnosMorososComponent', () => {
  let component: ReporteAlumnosMorososComponent;
  let userServiceMock: UsersServiceMock;
  let prestamoServiceMock : PrestamosServiceMock;
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
      declarations: [ ReporteAlumnosMorososComponent ],
     //los mock que creamos
     providers: [
      HttpClient,
      ReporteAlumnosMorososComponent,
      {
        provide: UsersService,
        useClass: UsersServiceMock,
      },
      {
        provide: PrestamosService,
        useClass: PrestamosServiceMock,
      },
      {
        provide: Router,
        useValue: spyRouter,
      },
      {
        provide: ToastrService,
        useClass: ToastrServiceMock,
      },
    ] 
    })
    component = TestBed.get(ReporteAlumnosMorososComponent);
    userServiceMock = TestBed.get(UsersService);
    prestamoServiceMock = TestBed.get(PrestamosService);
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

 it('should ngOnInit confirm User Logged Admin|Bibliotecario', () => {
  //Arrage
  userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);
  //de una vez se prueba el metodo validar menu en su rama verdadera
  userServiceMock.getLoggedInUserRoleBibliotecario.and.returnValue(true);
  var reporteList: Object[] = reporte3;
  prestamoServiceMock.reporte3.and.returnValue(of(reporteList));
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

it('should verReporte3 with length 0', () => {
  //Arrage
  var listaReporte: Object[] = reporte3Vacio;
  prestamoServiceMock.reporte3.and.returnValue(of(listaReporte));

  //Act
  component.verReporte3();

  //Spect
  //load users
});

it('should verReporte3 with error', () => {
  //Arrage
  var listaReporte: Object[] = reporte3;
  prestamoServiceMock.reporte3.and.returnValue(of(listaReporte));

  //enviamos un user real
  prestamoServiceMock.reporte3.and.returnValue(throwError({ status: 404, error: "error" }));

  //Act
  component.verReporte3();

  //Spect
  //load users
});

});
