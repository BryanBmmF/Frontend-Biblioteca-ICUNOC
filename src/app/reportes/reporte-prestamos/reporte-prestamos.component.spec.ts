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
import prestamos from '../../test/fileTest/prestamos.json';
import prestamoVacio from '../../test/fileTest/prestamoVacio.json';
import reporteUnoCuota from '../../test/fileTest/reporte1Cuota.json';
import reporteUnoCuotaVacio from '../../test/fileTest/reporte1CuotaVacio.json';

import { ReportePrestamosComponent } from './reporte-prestamos.component';

class UsersServiceMock {
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  getLoggedInUserRoleBibliotecario = jasmine.createSpy('getLoggedInUserRoleBibliotecario');
  logout = jasmine.createSpy('logout');
}

class PrestamosServiceMock{
  reporte1 = jasmine.createSpy('reporte1');
  reporte1Cuota = jasmine.createSpy('reporte1Cuota'); 
  reporte2 = jasmine.createSpy('reporte2'); 
}

class ToastrServiceMock {
  //estos mocks son del toastr
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
}

describe('ReportePrestamosComponent', () => {
  let component: ReportePrestamosComponent;
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
      declarations: [ ReportePrestamosComponent ],
      //los mock que creamos
      providers: [
        HttpClient,
        ReportePrestamosComponent,
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
    component = TestBed.get(ReportePrestamosComponent);
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
  //reporte1Cuota
  userServiceMock.getLoggedInUserRoleBibliotecario.and.returnValue(true);
  var reporteUnoCuotaList: Object[] = reporteUnoCuota;
  prestamoServiceMock.reporte1Cuota.and.returnValue(of(reporteUnoCuotaList));
  
  //reporte 1 
  userServiceMock.getLoggedInUserRoleBibliotecario.and.returnValue(true);
  var reporteList: Prestamo[] = prestamos;
  prestamoServiceMock.reporte1.and.returnValue(of(reporteList));
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

it('should verReporte1 with length 0', () => {

  //reporte 1 
 var reporteList: Prestamo[] = prestamoVacio;
  prestamoServiceMock.reporte1.and.returnValue(of(reporteList));

  //Act
  component.verReporte1();

  //Spect
  //load users
});

it('should verReporte1 with error', () => {
  //Arrage
  var listaReporte: Prestamo[] = prestamos;
  prestamoServiceMock.reporte1.and.returnValue(of(listaReporte));

  //enviamos un user real
  prestamoServiceMock.reporte1.and.returnValue(throwError({ status: 404, error: "error" }));

  //Act
  component.verReporte1();

  //Spect
  //load users
});

it('should verReporte1Cuota with length 0', () => {

  //reporte 1 
 var reporteList: Object[] = reporteUnoCuotaVacio;
  prestamoServiceMock.reporte1Cuota.and.returnValue(of(reporteList));

  //Act
  component.verReporte1Cuota();

  //Spect
  //load users
});

it('should verReporte1Cuota with error', () => {
  //Arrage
  var listaReporte: Object[] = reporteUnoCuota;
  prestamoServiceMock.reporte1Cuota.and.returnValue(of(listaReporte));

  //enviamos un user real
  prestamoServiceMock.reporte1Cuota.and.returnValue(throwError({ status: 404, error: "error" }));

  //Act
  component.verReporte1Cuota();

  //Spect
  //load users
});


it('should verReporte2', () => {
  //Arrage
  userServiceMock.getLoggedInUserRoleAdmin.and.returnValue(true);
  //de una vez se prueba el metodo validar menu en su rama verdadera
  userServiceMock.getLoggedInUserRoleBibliotecario.and.returnValue(true);
  var reporteList: Prestamo[] = prestamos;
  prestamoServiceMock.reporte2.and.returnValue(of(reporteList));
  //Act
  component.verReporte2();

  //Expect
  //continue load users
});

it('should verReporte2 with length 0', () => {
  //Arrage
  var listaReporte: Prestamo[] = prestamoVacio;
  prestamoServiceMock.reporte2.and.returnValue(of(listaReporte));
  //Act
  component.verReporte2();

  //Spect
  //load users
});

it('should verReporte2 with error', () => {
  //Arrage
  var listaReporte: Prestamo[] = prestamos;
  prestamoServiceMock.reporte2.and.returnValue(of(listaReporte));

  //enviamos un user real
  prestamoServiceMock.reporte2.and.returnValue(throwError({ status: 404, error: "error" }));

  //Act
  component.verReporte2();

  //Spect
  //load users
});

});
